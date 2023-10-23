import { Component, OnDestroy, OnInit } from '@angular/core';

import { Apollo, QueryRef, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { mutation_AddProductToUser, mutation_RemoveProductToUser, query_GetAllProducts, query_GetAllUser, query_GetProductsUser } from 'src/app/graphql/queries.graphql';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy  {

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
  
    const userName = this.userName; // Suponiendo que esto es correcto y userName tiene un valor adecuado
  
    this.querySubscriptionUsers = this.apollo
      .watchQuery<any>({
        query: query_GetProductsUser,
        variables: {
          name: userName, // pasando 'name' a la consulta
        },
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading2 = loading;        
        this.getAllUsers = data.productsByUser;
        console.log("Los productos del user", this.getAllUsers);
      }, (error) => {
        console.error('Error al cargar productos: ', error);
      });
  }

  

  //===============================================================


  removeProduct(product: any): void {
    console.log("id user login", this.userData, product.id);
  
    this.apolloAdd.mutate({
      mutation: mutation_RemoveProductToUser,
      variables: { 
        userId: this.userData, 
        productId: product.id 
      },refetchQueries: [
        {
          query: query_GetProductsUser,
          variables: { name: this.userName }, // usa las variables correctas para la consulta
        },
      ],
    }).subscribe(
      (response: any) => {
        console.log("Eliminno???:",response.data.removeProductFromUser)
        if(response.data.removeProductFromUser) {
          console.log('Producto Eliminado');
          this.loadProductsUser(); // recargar los productos después de la eliminación
        } else {
          console.error('No se pudo eliminar el producto');
          alert('No se pudo eliminar el producto');
        }
      },
      (error: any) => {
        console.error('Error al eliminar el producto:', error);
        alert('Error al eliminar el producto: ' + error.message);
      }
    );
  }
  
  
  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
    this.querySubscriptionUsers.unsubscribe();
  }
  
}