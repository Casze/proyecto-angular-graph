import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';
import { MUTATION_CreateProduct } from 'src/app/graphql/queries.graphql';



@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent implements OnInit, OnDestroy {

  errorMessage: string = '';
  successMessage: string = '';
  
  userLoginOn: Boolean;
  userData?: number;
  userName: String;
  loading: boolean = false;
  
  Create_name: string = '';
  Create_category: string = '';
  Create_price: string = '';
  Create_image: string = '';
  Create_username: String = '';
  Create_description: string = '';
  
  private querySubscription?: Subscription;

  constructor(
    private apollo: Apollo,
    private loginService: LoginService,    
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {this.userLoginOn=userLoginOn;}
    });
    this.loginService.currentUserData.subscribe({
        next:(userData) => {this.userData=userData;}
    });
    // Suscripción para userName
    const sub3 = this.loginService.userNameLoginON.subscribe(userName => {
      this.Create_username = userName;
      console.log(this.Create_username)
    });
  }

  CreateProduct(): void {
    const productsInput = {
      name: this.Create_name,
      category: this.Create_category,
      price: parseFloat(this.Create_price),
      image: this.Create_image,
      username: this.Create_username,
      description: this.Create_description
    };

    console.log(productsInput);

    this.apollo.mutate({
      mutation:  MUTATION_CreateProduct,
      variables: { productsInput },
    }).subscribe(
      () => {
        this.successMessage = 'Producto creado con éxito.';
        this.errorMessage = ''; // Limpiar cualquier mensaje de error anterior
        this.Create_name = '';
        this.Create_category = '';
        this.Create_price = '';
        this.Create_image = '';
        this.Create_description = '';
        this.router.navigate(['/create']);
      },
      (error: { message: string; }) => {
        this.errorMessage = 'Error al crear producto: Ingrese usuario existente';
        this.successMessage = ''; // Limpiar cualquier mensaje de éxito anterior
      }
    );
  }

  ngOnDestroy() {
    if (this.querySubscription) this.querySubscription.unsubscribe();
  }
}
