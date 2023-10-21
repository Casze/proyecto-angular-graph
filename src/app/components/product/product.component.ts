import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GetAllProducts } from 'src/app/graphql/queries.graphql';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  loading: boolean;
  product: any;

  private querySubscription: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GetAllProducts,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        console.log(data);
      });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

}
