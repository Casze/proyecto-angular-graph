import { Component, OnInit } from '@angular/core';
import { UserDocument } from 'src/app/interface/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
 

  userLoginOn: boolean = false;

  constructor(){ }

  ngOnInit(): void {
  }

}

/* 

Agregar *ngIf="!userLoginOn" para que se vea cuando nadie este logeado

Agregar *ngIf="userLoginOn" para que se vea cuando alguen esta logeado

*/
