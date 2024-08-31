import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrl: './activate.component.css'
})
export class ActivateComponent implements OnInit {

  constructor(private route: ActivatedRoute ,private router: Router, private service: LoginService, private snackBar: MatSnackBar){
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      this.service.activate(code).subscribe({
        next: (response: any) => {
          if(response != null){
            this.snackBar.open("You have succesfully activated your account.", undefined, { duration: 2000 })
            this.router.navigateByUrl('/auth/login');
          }
        },
        error: (err: any) => {
          if (err && err.error && err.error.error) {
            console.log('Activation failed', err.error.error);
          } else {
            console.log('Activation failed, unknown error:', err);
          }
        }
      });
    });
  }

}
