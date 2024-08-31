import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from '../services/message.service';
import { TokenService } from '../../auth/services/token.service';

@Component({
  selector: 'app-consultant-message',
  templateUrl: './consultant-message.component.html',
  styleUrl: './consultant-message.component.css'
})
export class ConsultantMessageComponent {
  formMessage: FormGroup;

  constructor(
    private builder: FormBuilder,
    private snackBar: MatSnackBar,
    private service: MessageService,
    private tokenService: TokenService
  ){
    this.formMessage = this.builder.group({
      message: [null, Validators.required]
    });
  }

  sendMessage(){
    const user = this.tokenService.getUser();
    const request = {
      content: this.formMessage.value.message,
      userId: user.id,
      toUserId: null
    }
    this.service.create(request).subscribe({
      next: () => {
        this.formMessage.reset();
        this.snackBar.open('Message sent, you will receive answer to your email.', 'Close', { duration: 4000 }); 
      },
      error: () => this.snackBar.open('Ann error occurred, message is not sent.', undefined, { duration: 2000 })
    })
  }
}
