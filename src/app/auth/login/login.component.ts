import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  

  constructor(
    private fromBuilder:FormBuilder,
    private router:Router,
    private loginService:LoginService
  ) {}

  loginForm = this.fromBuilder.group({
    email: ["test@gmail.com", [Validators.required,Validators.email]],
    password: ["",[Validators.required]],
  })

  ngOnInit(): void {
  }
  get email(){
    return this.loginForm.controls.email
  }
  get password(){
    return this.loginForm.controls.password
  }

  login(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value);
      this.router.navigateByUrl('/home');
      this.loginForm.reset();
    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos");
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

