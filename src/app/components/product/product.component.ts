import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { query_GetAllProducts, query_GetAllUser } from 'src/app/graphql/queries.graphql';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  userLoginOn:Boolean =false;

  userData?:User;

  loading: boolean;
  loading2: boolean;

  getAllProducts: any;
  getAllUsers: any;

  private querySubscription: Subscription;
  private querySubscriptionUsers: Subscription;
  ProductsQuery: QueryRef<any>;
  static getAllProducts: any;

  constructor(
    private apollo: Apollo,
    private loginService : LoginService,    
    
    ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadUsers();
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          this.userLoginOn=userLoginOn;
        }
    });
    this.loginService.currentUserData.subscribe(
      {
        next:(userData) => {
          this.userData=userData;
        }
    });
      
   
  }

  loadProducts(): void {

    console.log("loadProducts")

    this.ProductsQuery = this.apollo
    .watchQuery<any>({
      query: query_GetAllProducts,
    })
    console.log(this.ProductsQuery)

    this.querySubscription = this.ProductsQuery
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        console.log("entra en querySubscription")
        console.log(data.products);       
        this.getAllProducts = data.products;
        this.refresh();
      });
    console.log(this.querySubscription)
  }

  refresh():void{
    this.ProductsQuery.refetch();
  }

  loadUsers(): void {
    this.querySubscriptionUsers = this.apollo
      .watchQuery<any>({
        query: query_GetAllUser,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading2 = loading;
        console.log(data.users);
        this.getAllUsers = data.users;
      });
  }

  

  ngOnDestroy(): void {
  }

}
