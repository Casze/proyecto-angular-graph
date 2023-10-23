import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';
import { userName } from 'src/app/services/auth/userName';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLoginOn: Boolean;
  userData?: User;
  userName:String;
  private subscription: Subscription;

  constructor(
    
    private loginService : LoginService,
    
  ){}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {this.userLoginOn=userLoginOn;}
    });
    this.loginService.currentUserData.subscribe({
        next:(userData) => {this.userData=userData;}
    });
    // Suscripción para userName
    const sub3 = this.loginService.userNameLoginON.subscribe(userName => {
      this.userName = userName;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  
}
