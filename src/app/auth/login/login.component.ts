import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../../models/login-request.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogActions, MatDialogContent } from '@angular/material/dialog'
import { TokenService } from '../services/token.service';
import { User } from '../../models/user.model';
import { RegistrationRequest } from '../../models/registration-request.model';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  hide = true;
  isLoading = false;
  selectedFile: File | null = null;

  formLogin: FormGroup;
  formRegister: FormGroup;

  constructor(
    private builder: FormBuilder, 
    private router: Router, 
    private serviceL: LoginService, 
    private snackBar: MatSnackBar, 
    private tokenS: TokenService, 
    public dialog: MatDialog,
    private imageService: ImageService
  ){
      this.formLogin = this.builder.group({
        username: [null, Validators.required],
        password: [null, Validators.required]
      });
  
      this.formRegister = this.builder.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        city: [null, Validators.required],
        email: [null, Validators.required],
        username: [null, Validators.required],
        password: [null, Validators.required],
        avatar: [null]
      });
  }

  openDialog() {
    this.dialog.open(MailDialog);
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  login(){
    this.isLoading = true;

    const request: LoginRequest = {
      username: this.formLogin.value.username,
      password: this.formLogin.value.password
    }

    this.serviceL.login(request).subscribe({
      next: (response: any) => {
        if(response !== null){
          this.tokenS.saveToken(response.token);
          const currUser: User = {
            id: response.id,
            firstName: response.firstName,
            lastName: response.lastName,
            username: response.username,
            password: response.password,
            email: response.email,
            city: response.city,
            avatar: response.avatar,
            status: response.status
          }
          this.tokenS.saveUser(currUser);
          this.router.navigateByUrl('/');
        } else {
          this.openDialog();
        }
      },
      error: (response) => {
        this.snackBar.open('Invalid username or password', undefined, { duration: 2000 });
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  uploadAvatar(){
    if(this.selectedFile){
      this.imageService.uploadImage(this.selectedFile).subscribe({
        error: () => this.snackBar.open('An error occurred while uploading avatar.', undefined, { duration: 2000 })
      })
    }
  }

  register(){
    this.isLoading = true;

    const request: RegistrationRequest = {
      firstName: this.formRegister.value.firstName,
      lastName: this.formRegister.value.lastName,
      username: this.formRegister.value.username,
      password: this.formRegister.value.password,
      email: this.formRegister.value.email,
      city: this.formRegister.value.city,
      avatar: this.selectedFile ? this.selectedFile.name : ""
    }

    this.serviceL.register(request).subscribe({
      next: () => {
        this.formRegister.reset();
        this.uploadAvatar();
      },
      error: () => {
        this.snackBar.open('An error occured, registration is not possible.', undefined, { duration: 2000 });
        this.isLoading = false;
      },
      complete: () => {
        this.openDialog();
        this.isLoading = false;
      }
    });
  }
}

@Component({
  selector: 'mail-dialog',
  templateUrl: 'mail-dialog.html',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatIconModule, MatButtonModule]
})
export class MailDialog {}