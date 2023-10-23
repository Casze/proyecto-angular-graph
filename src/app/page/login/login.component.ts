import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { LoginService } from 'src/app/services/auth/login.service';
import { loginRequest } from 'src/app/services/auth/loginRequest';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm = this.formBuilder.group({  // 'formBuilder' starts with a lowercase
    name: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  loginError: string="";

  constructor(
  private formBuilder: FormBuilder, // Changed 'FormBuilder' to 'formBuilder'
  private router: Router,
  private loginService: LoginService,
) {}

  ngOnInit(): void {
    
  }

  get name(){
    return this.loginForm.controls.name;
  }
  get password(){
    return this.loginForm.controls.password;
  }

  login(){
    if(this.loginForm.valid){
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
    }
    else{
      this.loginForm.markAllAsTouched()
      alert("Error al ingresar los datos")
    }
  }

}
