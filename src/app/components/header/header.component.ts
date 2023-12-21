import { Component, OnDestroy, OnInit } from '@angular/core';
import { User, UserDocument, UserLogeado } from 'src/app/interface/user';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
 

  userLoginOn: boolean = false;
  userLoginOnUser: UserLogeado;
  userLoginOnUserName: String = null;

  constructor(
    private loginService:LoginService
  ){ }
  ngOnInit(): void {   
    this.ObtenerUsuario() ;
    //console.log("Logeado?",this.userLoginOn);
    //console.log("Datos IDUser",this.userLoginOnUser);
    //console.log("Datos User",this.userLoginOnUserName);
  }

  
  ObtenerUsuario(){
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

  ngOnDestroy(): void {
    this.loginService.currentUserData.unsubscribe();
    this.loginService.currentUserId.unsubscribe();
    this.loginService.currentUserLoginOn.unsubscribe();
  }
}

/* 

Agregar *ngIf="!userLoginOn" para que se vea cuando nadie este logeado

Agregar *ngIf="userLoginOn" para que se vea cuando alguen esta logeado

*/
