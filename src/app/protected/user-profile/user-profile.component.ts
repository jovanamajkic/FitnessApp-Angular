import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { TokenService } from '../../auth/services/token.service';
import { UserUpdateRequest } from '../../models/update-user-request.model';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  imageSrc: any = '';
  avatar: File | null = null;
  formProfile: FormGroup;
  hide = true;

  constructor(
    private sanitizer: DomSanitizer, 
    private builder: FormBuilder, 
    private tokenService: TokenService, 
    private userService: UserService,
    private snackBar: MatSnackBar, 
    private dialog: MatDialog,
    private imageService: ImageService
  ) {
    this.formProfile = this.builder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      city: [null, Validators.required],
      email: [null, Validators.required],
      username: new FormControl({value: '', disabled: true}),
      password: [null, Validators.required],
      avatar: [null]
    })
  }

  ngOnInit(): void {
    const user = this.tokenService.getUser();
    this.formProfile.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
      email: user.email,
      username: user.username
    })
    if(user.avatar)
      this.loadAvatar(user.avatar);
  }

  loadAvatar(imageName: string){
    this.imageService.getUrl(imageName)?.subscribe(data => this.imageSrc = data);
  }

  openDialog(){
    this.dialog.open(ChangePasswordDialog);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.updateImage(input.files[0]);
      this.avatar = input.files[0];
    }
  }

  updateImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  deletePhoto(): void {
    this.imageSrc = "";
  }

  update(): void {
    const request: UserUpdateRequest = {
      firstName: this.formProfile.value.firstName,
      lastName: this.formProfile.value.lastName,
      email: this.formProfile.value.email,
      city: this.formProfile.value.city,
      avatar: this.avatar?.name
    }
    this.userService.updateUser(request).subscribe({
      next: (updatedUser) => {
        this.tokenService.saveUser(updatedUser);
        this.updateAvatar();
        this.snackBar.open('Your profile is succesfully updated!', undefined, { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('An error occured, update is not possible.', undefined, { duration: 3000 });
      }
    });
  }

  updateAvatar(){
    if(this.avatar){
      this.imageService.uploadImage(this.avatar).subscribe(data => this.imageSrc = data);
    }
  }
}

@Component({
  selector: 'change-password',
  templateUrl: 'change-password.dialog.html',
  standalone: true,
  imports: [AppMaterialModule, ReactiveFormsModule]
})
export class ChangePasswordDialog {
  hide1 = true;
  hide2 = true;
  formPassword: FormGroup;

  constructor(private builder: FormBuilder, private service: UserService, private snackBar: MatSnackBar){
    this.formPassword = this.builder.group({
      currPassword: [null, Validators.required],
      newPassword: [null, Validators.required]
    })
  }

  save(): void{
    this.service.changePassword(this.formPassword.value.currPassword, this.formPassword.value.newPassword).subscribe({
      next: () => {
        this.snackBar.open('Your password is changed!', undefined, { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('An error occured, password change is not possible.', undefined, { duration: 3000 });
      }
    });
  }
}
