import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { query_GetAllProducts } from 'src/app/graphql/queries.graphql';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  loading: boolean;
  getAllProducts: any;

  private querySubscription: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.loadProducts();
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

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

}
