import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommentService } from '../../protected/services/comment.service';
import { TokenService } from '../../auth/services/token.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentRequest } from '../../models/comment-request';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrl: './comment-dialog.component.css'
})
export class CommentDialogComponent {
  commentForm: FormGroup;
  newComment: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { programId: number },
    private builder: FormBuilder,
    private service: CommentService,
    private tokenService: TokenService,
    private snackBar: MatSnackBar,
    public dialog: MatDialogRef<CommentDialogComponent>
  ){
    this.commentForm = this.builder.group({
      content: ['', Validators.required]
    })
    console.log(Date.UTC);
  }

  onAdd(){
    const user = this.tokenService.getUser();
    const request: CommentRequest = {
      content: this.commentForm.value.content,
      userId: user.id,
      programId: this.data.programId
    }
    console.log(request);
    this.service.insert(request).subscribe({
      next: (data) => {
        this.newComment = data;
        this.commentForm.reset();
      },
      error: () => this.snackBar.open('An error occurred, comment is not added', undefined, { duration: 2000 }),
      complete: () => this.dialog.close(this.newComment)
    });
  }
}
