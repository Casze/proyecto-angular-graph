import { Component, OnInit } from '@angular/core';
import { UserDocument, UserLogeado } from 'src/app/interface/user';
import { ApiService } from 'src/app/services/api/api.service';
import { LoginService } from 'src/app/services/auth/login.service';


@Component({
  selector: 'app-descubrir',
  templateUrl: './descubrir.component.html',
  styleUrls: ['./descubrir.component.css']
})
export class DescubrirComponent implements OnInit {
  userLoginOn: boolean = false;
  userLoginOnUser: UserLogeado;  
  userLoginOnUserName: String = null;

  user: UserDocument;
  products: any[] = [];


  constructor(
    private apiService: ApiService,
    private loginService:LoginService
    ) { }

  ngOnInit(): void {
    // Obtener datos de usuario Logeado
    this.ObtenerUserLogeado();

    // Obtener los productos
    this.ObtenerDataProductsRecomendados(this.userLoginOn);
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
    //console.log("Logeado?",this.userLoginOn);
    //console.log("Datos IDUser",this.userLoginOnUser);
    //console.log("Datos User:",this.userLoginOnUserName);
  }
  ObtenerDataProductsRecomendados(Logeado: boolean){
    if (Logeado) {
      this.apiService.postrecommendProducts(String(this.userLoginOnUser)).subscribe(datos => {
        this.products = datos;
      })
    }
    else {
      this.apiService.getProductByCategory(String("Clothes")).subscribe(datos => {       
        this.products = datos;        
      });
    }
  }
}

