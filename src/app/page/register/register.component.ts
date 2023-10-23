import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { mutation_Register } from 'src/app/graphql/queries.graphql';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy{

  loading: boolean;
  userName = '';
  userPassword = '';
  usernameError: boolean = false; // Variable para controlar la validación del nombre de usuario
  passwordError: boolean = false; // Variable para controlar la validación de la contraseña

  private querySubscription: Subscription;

  constructor(
    private apollo: Apollo,
    private router: Router,
  ) {}
  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }}

  OnRegister(): void {
    // Expresiones regulares para validar letras y números
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    const passwordPattern = /^[a-zA-Z0-9]+$/;

    if (!this.userName) {
      this.usernameError = true; // Muestra el mensaje de error si userName está vacío
      return; // Detén el proceso de registro
    }

    if (!usernamePattern.test(this.userName)) {
      this.usernameError = true; // Muestra el mensaje de error si userName no cumple el patrón
      return; // Detén el proceso de registro
    }

    if (!this.userPassword) {
      this.passwordError = true; // Muestra el mensaje de error si userPassword está vacío
      return; // Detén el proceso de registro
    }

    if (!passwordPattern.test(this.userPassword)) {
      this.passwordError = true; // Muestra el mensaje de error si userPassword no cumple el patrón
      return; // Detén el proceso de registro
    }

    // Continúa con el proceso de registro si los campos de usuario y contraseña cumplen con los patrones
    this.apollo.mutate({
      mutation: mutation_Register,
      variables: { name: this.userName, password: this.userPassword },
    }).subscribe(() => {
      this.router.navigate(['/']);
    }), err => {
      alert(err);
    };
  }
}
