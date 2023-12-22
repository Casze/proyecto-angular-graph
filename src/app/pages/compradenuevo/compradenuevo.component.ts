import { Component, OnInit } from '@angular/core';
import { UserDocument, UserLogeado } from 'src/app/interface/user';
import { ApiService } from 'src/app/services/api/api.service';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-compradenuevo',
  templateUrl: './compradenuevo.component.html',
  styleUrls: ['./compradenuevo.component.css']
})
export class CompradenuevoComponent implements OnInit {
  userLoginOn: boolean = false;
  userLoginOnUser: UserLogeado;
  userLoginOnUserName: String = null;


  electronics: any[] = [];
  clothes: any[] = [];
  furniture: any[] = [];

  constructor(
    private apiService: ApiService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    // Obtener datos de usuario Logeado
    this.ObtenerUserLogeado();

    // Obtener los productos por categorias
    this.Obtener_recommendElectronicsProducts(this.userLoginOn);
    this.Obtener_recommendFurnitureProducts(this.userLoginOn);
    this.Obtener_recommendProductsClothes(this.userLoginOn);
    // Obtener los usuarios
    //this.ObtenerDataUser();
  }

  ObtenerUserLogeado() {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });
    this.loginService.currentUserId.subscribe({
      next: (userLoginOnUser) => {
        this.userLoginOnUser = userLoginOnUser;
      }
    });
    this.loginService.currentUserData.subscribe({
      next: (userLoginOnUserName) => {
        this.userLoginOnUserName = userLoginOnUserName;
      }
    });
  }

  Obtener_recommendElectronicsProducts(Logeado: boolean) {
    if (Logeado) {
      this.apiService.post_recommendElectronicsProducts(String(this.userLoginOnUser)).subscribe(datos => {
        this.electronics = datos.map(producto => ({
          ...producto,
          _id: producto.id // Asumiendo que los productos vienen con una propiedad 'id'
        }));    
      });
    }
    else {
      this.apiService.getProductByCategory(String("Electronics")).subscribe(datos => {
        this.electronics = datos;
      });
    }
  }
  Obtener_recommendFurnitureProducts(Logeado: boolean) {
    if (Logeado) {
      this.apiService.post_recommendFurnitureProducts(String(this.userLoginOnUser)).subscribe(datos => {
        this.furniture = datos.map(producto => ({
          ...producto,
          _id: producto.id // Asumiendo que los productos vienen con una propiedad 'id'
        }));       
      });
    }
    else {
      this.apiService.getProductByCategory(String("Furniture")).subscribe(datos => {
        this.furniture = datos;
      });
    }
  }

  Obtener_recommendProductsClothes(Logeado: boolean) {
    if (Logeado) {
      this.apiService.post_recommendProductsClothes(String(this.userLoginOnUser)).subscribe(datos => {
        this.clothes = datos.map(producto => ({
          ...producto,
          _id: producto.id // Asumiendo que los productos vienen con una propiedad 'id'
        }));
      })
    }
    else {
      this.apiService.getProductByCategory(String("Clothes")).subscribe(datos => {       
        this.clothes = datos;        
      });
    }
  }

  Obtener_recommendProductsClothes2(Logeado: boolean) {
    console.log("INGRESO A CLOTHES");
    console.log("PR id:", this.userLoginOnUser);

    if (Logeado) {
      console.log("LOGEADO SI");
      this.apiService.post_recommendProductsClothes(String(this.userLoginOnUser)).subscribe(datos => {
        console.log("ObtenerDatos", datos);
        // Suponiendo que 'datos' es un array. Si es un objeto con una propiedad que es un array, 
        // tendrás que ajustar esto para acceder a esa propiedad, por ejemplo, datos.resultados
        if (datos && datos.length > 0) {
          console.log("entro al If len > 0");
          this.clothes = datos;
        } else {
          console.log("entro al Else: len 0");
          // Aquí puedes manejar el caso de no recibir datos (por ejemplo, dejar 'this.clothes' como está o establecer un valor por defecto)
        }
        console.log("RELLENO:", this.clothes);
        // Este log ahora mostrará los datos después de que se hayan recibido y procesado
        console.log("this.clothes.length:", this.clothes.length);
      });
    } else {
      console.log("LOGEADO NO");
      console.log("Rellenar con todos");
      this.apiService.getProductByCategory("Clothes").subscribe(datos => {
        console.log("GET getProductByCategory:", datos);
        this.clothes = datos;
        console.log("RELLENO:", this.clothes);
        // Este log ahora mostrará los datos después de que se hayan recibido y procesado
        console.log("this.clothes.length:", this.clothes.length);
      });
    }
    // Este log se ejecutará antes de que las llamadas API se completen, por lo que 'this.clothes' aún no tendrá los datos nuevos
    // Mover cualquier lógica que dependa de 'this.clothes' lleno dentro de los bloques 'subscribe' correspondientes
  }

  recordClick(IdProduct: String) {
    console.log('Datos que entraron User',this.userLoginOnUser);
    console.log('Datos que entraron Product',IdProduct);
    this.apiService.post_recordClick(String(this.userLoginOnUser), String(IdProduct)).subscribe({
      next: (response) => {
        // Aquí puedes manejar la respuesta. Por ejemplo:
        console.log('Click registrado con éxito', response);
      },
      error: (error) => {
        // Aquí puedes manejar errores. Por ejemplo:
        console.error('Error al registrar click', error);
      }
    });
  }
}