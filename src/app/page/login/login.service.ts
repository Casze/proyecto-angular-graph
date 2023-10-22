import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { LOGIN_MUTATION } from 'src/app/graphql/queries.graphql';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private apollo: Apollo) {}

  login(name: string, password: string) {

    return this.apollo.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        name: name,
        password: password
      }
    });
  }
} 
