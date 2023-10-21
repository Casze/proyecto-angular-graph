import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { query_GetAllProducts } from 'src/app/graphql/queries.graphql';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private apollo: Apollo    
  ) {}
  
}
