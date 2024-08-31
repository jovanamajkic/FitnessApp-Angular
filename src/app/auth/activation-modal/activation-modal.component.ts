import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginRequest } from '../../models/login-request.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-activation-modal',
  templateUrl: './activation-modal.component.html',
  styleUrl: './activation-modal.component.css'
})

export class ActivationModalComponent {
  formActivation: FormGroup;

  constructor(private builder: FormBuilder ,private router: Router, private service: LoginService, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.formActivation = builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  activate(): void{
    if (this.formActivation.valid) {
      const username = this.formActivation.value.username;
      const password = this.formActivation.value.password;
      
      if(this.data.username === username && this.data.password === password){
        const request: LoginRequest = {
          username: this.data.username,
          password: this.data.password
        }
        
        this.service.resendActivation(request).subscribe({
          next: (response: any) => {
            if(response != null){
              this.snackBar.open("Activation link is sent to you, please check your email.", undefined, { duration: 4000 });
            }
          },
          error: (err: any) => {
            console.error('Activation failed', err.error.error);
          }
        })
      }
    }
  }
}
