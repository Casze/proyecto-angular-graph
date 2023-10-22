import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { AuthService } from './auth.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private apollo: Apollo, private authService: AuthService) {}

  onSubmit() {
    const LOGIN_MUTATION = gql`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          user {
            id
            email
          }
        }
      }
    `;

    this.apollo.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        email: this.email,
        password: this.password
      }
    }).subscribe(({ data }: any) => {
      if (data && data.login && data.login.token) {
        this.authService.setToken(data.login.token);
        this.authService.setUserId(data.login.user.id);
      }
    }, (error) => {
      console.error('Error al iniciar sesión:', error);
    });
  }
}
