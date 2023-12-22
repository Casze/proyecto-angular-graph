import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDocument, UserLogeado } from 'src/app/interface/user';
import { ApiService } from 'src/app/services/api/api.service';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  userLoginOn: boolean = false;
  userLoginOnUser: UserLogeado;
  userLoginOnUserName: String = null;

  user: UserDocument;

  products: any;
  recomendados: any []=[];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private loginService:LoginService
    
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.apiService.getProductByID(productId).subscribe(
        (data) => {
          this.products = data;
        },
        (error) => {
          console.error('Error fetching product details', error);
        }
      );
      console.log("ID PRODUCTO",productId)
      this.ObtenerUserLogeado();
      this.productsRecomendados(productId);
    }
    
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

  productsRecomendados(IdProduct: String) {
    this.apiService.post_findProductsByCategoryOfProduct(IdProduct).subscribe(datos => {       
      this.recomendados = datos;        
    });
    
  }

}