
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { mutation_CreateProduct, mutation_Register } from 'src/app/graphql/queries.graphql';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  loading: boolean;
  // Create  
  Create_name:'';
  Create_category:'';
  Create_price:'';
  Create_image:'';
  Create_username:'';
  Create_description:'';

  // Update

  // Delete

  // Otos
  private querySubscription: Subscription;

  constructor(
    private apollo: Apollo,
    private router: Router,
  ) {}

  ngOnInit():void{
  }

  CreateProduct():void{
    this.apollo.mutate({
      mutation: mutation_CreateProduct,
      variables:{
          name: this.Create_name,
          category: this.Create_category,
          price: parseFloat(this.Create_price),
          image: this.Create_image,
          username: this.Create_username,
          description: this.Create_description },     
    }).subscribe(() => {
      this.router.navigate(['/']);
    }), err => {
      alert(err);
    };
  }

}
