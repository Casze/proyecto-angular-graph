import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { User, UserDocument } from 'src/app/interface/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: UserDocument;
  products: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    //this.ObtenerDataUser();
    this.ObtenerDataProducts();
  }

  ObtenerDataUser(){
    this.apiService.getUserEjemplo().subscribe(data => {
      this.user = data;
      console.log("Usuario:",this.user);
      console.log("id:",this.user._id);
    });
  }
  ObtenerDataProducts(){
    this.apiService.getProducts().subscribe(datos => {
      this.products = datos;
      console.log("Productos:",this.products);
    });
  }

  
  
}
