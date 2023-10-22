import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm = this.fb.group({
    name: ['admin',[Validators.required]],
    password: ['',[Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,

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
      this.router.navigateByUrl('/inicio');
      this.loginForm.reset();

    }
    else{
      this.loginForm.markAllAsTouched()
      alert("Error al ingresar los datos")
    }
  }

}
