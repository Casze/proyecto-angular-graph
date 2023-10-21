import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { mutation_Register } from 'src/app/graphql/queries.graphql';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  loading: boolean;
  userName = '';
  userPassword = '';
  registro:any;

  private querySubscription: Subscription;

  constructor(
    
    private apollo: Apollo,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    
  ) {}

  ngOnInit(): void {
  }

  OnRegister({Name,Pass}):void{
    this.apollo.mutate({
      mutation: mutation_Register,
      variables:{ name: this.userName,password: this.userPassword},
    }).subscribe(() => {
      this.router.navigate(['/']);      
    }),
    err => {
      alert(err);
    }

  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }
}
