import { Component, OnInit } from '@angular/core';
import { UserDocument, UserLogeado } from 'src/app/interface/user';
import { ApiService } from 'src/app/services/api/api.service';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  userLoginOn: boolean = false;
  userLoginOnUser: UserLogeado;  
  userLoginOnUserName: String = null;

  
  electronics: any[] = [];
  clothes: any[] = [];
  furniture: any[] = [];

  constructor(
    private apiService: ApiService,
    private loginService:LoginService
    ) { }

  ngOnInit(): void {
    // Obtener datos de usuario Logeado
    this.ObtenerUserLogeado();

    // Obtener los productos
    this.Obtener_recommendElectronicsProducts();
    this.Obtener_recommendFurnitureProducts();
    this.Obtener_recommendProductsClothes();
    // Obtener los usuarios
    //this.ObtenerDataUser();
  }

  ObtenerUserLogeado(){
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn)=>{
        this.userLoginOn=userLoginOn;
      }
    });
    this.loginService.currentUserId.subscribe({
      next:(userLoginOnUser)=>{
        this.userLoginOnUser=userLoginOnUser;
      }
    });    
    this.loginService.currentUserData.subscribe({
      next:(userLoginOnUserName)=>{
        this.userLoginOnUserName=userLoginOnUserName;
      }
    });
  }

  Obtener_recommendElectronicsProducts(){
    console.log("PR id:",this.userLoginOnUser);
    this.apiService.post_recommendElectronicsProducts(String(this.userLoginOnUser)).subscribe(datos => {
      console.log("PR datos recommendElectronicsProducts:",datos);
      this.electronics = datos;
      console.log("recommendElectronicsProducts",this.electronics);
    });
  }
  Obtener_recommendFurnitureProducts(){
    console.log("PR id:",this.userLoginOnUser);
    this.apiService.post_recommendFurnitureProducts(String(this.userLoginOnUser)).subscribe(datos => {
      console.log("PR recommendFurnitureProducts:",datos);
      this.furniture = datos;
      console.log("recommendFurnitureProducts",this.furniture);
    });
  }
  Obtener_recommendProductsClothes(){
    console.log("PR id:",this.userLoginOnUser);
    this.apiService.post_recommendProductsClothes(String(this.userLoginOnUser)).subscribe(datos => {
      console.log("PR datos recommendProductsClothes:",datos);
      this.clothes = datos;
      console.log("recommendProductsClothes",this.clothes);
    });
  }
}
