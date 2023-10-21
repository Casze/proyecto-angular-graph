import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { query_GetAllProducts, query_GetAllUser } from 'src/app/graphql/queries.graphql';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  loading: boolean;
  loading2: boolean;

  getAllProducts: any;
  getAllUsers: any;

  private querySubscription: Subscription;
  private querySubscriptionUsers: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadUsers();
  }

  loadProducts(): void {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: query_GetAllProducts,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        console.log(data.products);       
        this.getAllProducts = data.products;
      });
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
    this.querySubscription.unsubscribe();
    this.querySubscriptionUsers.unsubscribe();
  }

}
