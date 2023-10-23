import { Component } from '@angular/core';

import { Apollo, QueryRef, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { mutation_AddProductToUser, query_GetAllProducts, query_GetAllUser, query_GetProductsUser } from 'src/app/graphql/queries.graphql';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  userLoginOn:Boolean;
  userData?:number;
  userName:String;

  loading: boolean;
  loading2: boolean;

  getAllProducts: any;
  getAllUsers: any;
  

  private querySubscription: Subscription;
  private querySubscriptionUsers: Subscription;
  ProductsQuery: QueryRef<any>;

  constructor(
    private apollo: Apollo,
    private apolloAdd: Apollo,
    private loginService : LoginService,    
    
    ) {}

  ngOnInit(): void { 
    this.loginService.currentUserData.subscribe(
      {
        next:(userData) => {
          this.userData=userData;
        }
    });   
    //Obtengo los datos y estado del usuario
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          this.userLoginOn=userLoginOn;
        }
    });
    // Suscripción para userName
    const sub3 = this.loginService.userNameLoginON.subscribe(userName => {
      this.userName = userName;
    });
    console.log("Estado", this.userLoginOn);
    console.log("ID", this.userData);
    this.loadProductsUser();
  }

  
  loadProductsUser(): void {
    console.log("id user login", this.userData);

    // Suponiendo que this.userData tiene una propiedad 'name' que quieres usar
    const userName = this.userName;

    this.querySubscriptionUsers = this.apollo
      .watchQuery<any>({
        query: query_GetProductsUser,
        variables: {
          name: userName, // pasando 'name' a la consulta
        },
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading2 = loading;        
        // Asumiendo que quieres almacenar los productos en 'this.getAllUsers'
        this.getAllUsers = data.productsByUser; // asegúrate de que esto coincida con la estructura de tus datos
        console.log("Los productos del user", this.getAllUsers);
      }, (error) => {
        console.error('Error al cargar productos: ', error);
      });
  }

  //===============================================================
  
  /*
  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
    this.querySubscriptionUsers.unsubscribe();
  }
  */
}