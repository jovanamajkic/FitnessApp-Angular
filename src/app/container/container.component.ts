import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../auth/services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared-components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {
  constructor(
    private loginService: LoginService, 
    private router: Router,
    private dialog: MatDialog
  ){}

  isLoggedIn(): boolean{
    return this.loginService.isAuthenticated();
  }

  logout(){
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { key: "logout" },
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'confirm'){
        this.loginService.logout();
        this.router.navigateByUrl('/public');
      }
    });
  }
}
