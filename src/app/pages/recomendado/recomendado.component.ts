import { Component } from '@angular/core';
import { UserDocument, UserLogeado } from 'src/app/interface/user';
import { ApiService } from 'src/app/services/api/api.service';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-recomendado',
  templateUrl: './recomendado.component.html',
  styleUrls: ['./recomendado.component.css']
})
export class RecomendadoComponent {
  
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
    this.ObtenerDataProductsRecomendados();
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
  ObtenerDataProductsRecomendados(){
    console.log("PR id:",this.userLoginOnUser);
    this.apiService.postrecommendProducts(String(this.userLoginOnUser)).subscribe(datos => {
      console.log("PR datos:",datos);
      this.products = datos;
      console.log("Productos Recomendados:",this.products);
    });
  }
}
