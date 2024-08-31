import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../auth/services/login.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {
  constructor(private loginService: LoginService, private router: Router){}

  isLoggedIn(): boolean{
    return this.loginService.isAuthenticated();
  }

  logout(){
    this.loginService.logout();
    this.router.navigateByUrl('/public');
  }
}
