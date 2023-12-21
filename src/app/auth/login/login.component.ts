import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/interface/user';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError:string='';  

  loginForm = this.fromBuilder.group({
    username: ["", [Validators.required]],
    password: ["",[Validators.required]],
  })

  constructor(
    private fromBuilder:FormBuilder,
    private router:Router,
    private loginService:LoginService
  ) {}
  

  ngOnInit(): void {
  }
  get name(){
    return this.loginForm.controls.username
  }
  get password(){
    return this.loginForm.controls.password
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (success) => {
          if (success) {
            //console.log("Inicio de sesión exitoso");
            this.router.navigate(['/dashboard']); // Asegúrate de reemplazar '/dashboard' con la ruta deseada
            this.loginForm.reset();
          } else {
            this.loginError = "Credenciales incorrectas";
          }
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError = "Error al iniciar sesión";
        },
        complete: () => {
          //console.log("Proceso de login finalizado");
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      alert("Por favor, completa todos los campos requeridos.");
    }
  }
}
/*

this.loginService.login(this.loginForm.value as loginRequest).subscribe({
        next: (userData) => {
          console.log("Datos recuperados",userData);
        },
        error: (errorData) => {
          console.log(errorData);
          this.loginError=errorData;
        },
        complete: () =>{
          console.log("Login Completo");
          this.router.navigate(['/']);
          this.loginForm.reset();
        }
      });

*/

