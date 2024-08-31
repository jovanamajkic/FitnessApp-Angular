import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { TokenService } from '../../auth/services/token.service';
import { User } from '../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css'
})
export class InboxComponent implements OnInit {
  formMessage: FormGroup;
  users: User[] = [];
  sender: any;
  messages: any[] = [];
  allMessages: any[] = [];
  isResetDisabled: boolean = true;

  constructor(
    private builder: FormBuilder,
    private messageService: MessageService,
    private userService: UserService,
    private tokenService: TokenService,
    private snackBar: MatSnackBar
  ){
    this.formMessage = this.builder.group({
      toUser: [null, Validators.required],
      content: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.sender = this.tokenService.getUser();
    this.loadUsers();
    this.loadMessages();
  }

  loadUsers(){
    this.userService.getAll().subscribe(data => {
      this.users = data.filter(user => user.id !== this.sender.id);
    })
  }

  loadMessages(){
    this.messageService.getAllByToUser(this.sender.id).subscribe(data => {
      this.messages = data;
      this.allMessages = this.messages;
      console.log(this.messages);
    })
  }

  markMessageRead(id: number){
    this.messageService.markAsRead(id).subscribe({
      next: () => {
        this.snackBar.open('Message is marked as read.', undefined, { duration: 2000 });
        const message = this.messages.find(m => m.id === id);
        if (message) {
          message.isRead = true; 
        }
      },
      error: (error) => {
        this.snackBar.open('An error occurred.', undefined, { duration: 2000 });
        console.error('Update failed:', error);
      }
    });

  }

  onSelectionChange(value: any){
    this.messages = this.messages.filter(m => m.user.id === value);
    this.isResetDisabled = false;
  }

  reset(){
    this.messages = this.allMessages;
    this.isResetDisabled = true;
  }

  sendMessage(){
    const request = {
      content: this.formMessage.value.content,
      userId: this.sender.id,
      toUserId: this.formMessage.value.toUser
    }
    this.messageService.create(request).subscribe({
      next: () => {
        this.formMessage.reset();
        this.snackBar.open('Message is sent.', undefined, { duration: 2000 });
      },
      error: () => this.snackBar.open('An error occurred, message is not sent.', undefined, { duration: 2000 })
    })
  }

}
