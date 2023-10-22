import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { AuthService } from './auth.service'; // Modifica la ruta de importación para apuntar al AuthService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    name: ['admin', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  get name() {
    return this.loginForm.controls.name;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  login() {
    if (this.loginForm.valid) {
      const { name, password } = this.loginForm.value;

      this.loginService.login(name, password).subscribe(
        ({ data }) => {
          if (data && data.login && data.login.token) {
            this.authService.setToken(data.login.token);
            this.router.navigateByUrl('/inicio');
            this.loginForm.reset();
          } else {
            alert('Error en el inicio de sesión. Inténtelo de nuevo.');
          }
        },
        error => {
          console.error('Error al iniciar sesión:', error);
          alert('Error al ingresar los datos.');
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
      alert('Error al ingresar los datos.');
    }
  }
}

