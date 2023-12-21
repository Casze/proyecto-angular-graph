import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { User, UserDocument, UserLogeado } from 'src/app/interface/user';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userLoginOn: boolean = false;
  userLoginOnUser: UserLogeado;
  userLoginOnUserName: String = null;

  user: UserDocument;
  products: any[] = [];

  constructor(
    private apiService: ApiService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    // Obtener datos de usuario Logeado
    this.ObtenerUserLogeado();

    // Obtener los productos
    this.ObtenerDataProducts();
    // Obtener los usuarios
    //this.ObtenerDataUser();
  }

  ObtenerDataProducts() {
    this.apiService.getProducts().subscribe(datos => {
      this.products = datos;
      //console.log("Productos:",this.products);
    });
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
    //console.log("Logeado?",this.userLoginOn);
    //console.log("Datos IDUser",this.userLoginOnUser);
    //console.log("Datos User:",this.userLoginOnUserName);
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


