import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  loading: boolean;

  
  userName = '';
  email = '';
  password:''; 
  usernameError: boolean = false; // Variable para controlar la validación del nombre de usuario
  passwordError: boolean = false; // Variable para controlar la validación de la contraseña
  emailError: boolean = false; // Variable para controlar la validación de la contraseña

  constructor(
    private fromBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) { }
  ngOnInit(): void {

  }

  OnRegister() {
    this.apiService.post_USER_registerUser(this.userName, this.email, this.password).subscribe({
      next: (response) => {
        // Aquí puedes manejar la respuesta. Por ejemplo:
        console.log('Registrado con éxito', response);
      },
      error: (error) => {
        // Aquí puedes manejar errores. Por ejemplo:
        console.error('Error al registrar', error);
      }
    });
  }
  validarFormulario(): boolean {
    // Implementa tus propias reglas de validación aquí
    // y ajusta las variables de error correspondientes
    // Retorna true si el formulario es válido, de lo contrario false
    return true;
  }
}
