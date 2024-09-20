import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../auth/services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';
import { Comment } from '../../models/comment.model';
import { PageEvent } from '@angular/material/paginator';
import { CommentService } from '../../protected/services/comment.service';
import { ImageService } from '../../services/image.service';
import { TokenService } from '../../auth/services/token.service';
import { catchError, forkJoin, map, of, tap } from 'rxjs';
import { ProgramHasAttributeValueService } from '../../protected/services/program-has-attribute-value.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ProgramService } from '../../public/services/program.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { UserHasProgramService } from '../../protected/services/user-has-program.service';
import { BuyProgramDialogComponent } from '../buy-program-dialog/buy-program-dialog.component';
import { VideoDialogComponent } from '../video-dialog/video-dialog.component';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrl: './program-details.component.css'
})
export class ProgramDetailsComponent implements OnInit {
  program: any;
  comments: Comment[] = [];
  values: Map<string, string[]> = new Map<string, string[]>();
  totalComments = 0;
  pageSize = 10;
  currentPage = 0;
  user: any;
  isPurchased: boolean = false;
  startDate = "";
  isCompleted = false;
  progresbar = 0;
  tooltip = "";

  constructor(
    private loginService: LoginService,
    private commentService: CommentService,
    private dialog: MatDialog,
    private imageService: ImageService,
    private service: ProgramHasAttributeValueService,
    private tokenService: TokenService,
    private programService: ProgramService,
    private snackBar: MatSnackBar,
    private location: Location,
    private userHasProgramService: UserHasProgramService
  ) {}

  ngOnInit(): void {
    this.program = history.state.program;
    this.loadValues();
    this.loadComments();
    this.user = this.tokenService.getUser();
    if(this.isLoggedIn())
      this.userHasProgram();
  }

  isUserCreator(){
    return this.user.id === this.program.user.id ? true : false;
  }

  isLoggedIn(): boolean{
    return this.loginService.isAuthenticated();
  }

  userHasProgram() {
    this.userHasProgramService.get(this.user.id, this.program.id).subscribe(data => {
      if(data){
        this.isPurchased = true;
        this.startDate = data.startDate;
        this.isCompleted = data.isCompleted;
        if(!this.isCompleted){
          const number = Date.now() - Date.parse(this.startDate);
          const daysPassed = Math.floor(number / (1000 * 60 * 60 * 24));
          this.progresbar = (daysPassed / this.program.duration) * 100;
          this.tooltip = this.program.duration - daysPassed + " days left";
        }
      }
    })
  }

  openDialog(){
    let dialogRef = this.dialog.open(CommentDialogComponent, {
      data: { programId: this.program.id },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadComments();
    })
  }

  delete(){
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { key: "delete this program" },
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'confirm')
        this.programService.delete(this.program.id).subscribe({
          next: () => {
            this.snackBar.open('You have succesfully deleted all data.', undefined, { duration: 2000 });
            this.location.back();
          },
          error: () => this.snackBar.open('An error occurred, program is not deleted.', undefined, { duration: 2000 })
        });
    })
  }

  buy(){
    let dialogRef = this.dialog.open(BuyProgramDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'confirm'){
        const request = {
          userId: this.user.id,
          programId: this.program.id
        };
        this.userHasProgramService.insert(request).subscribe({
          next: (response) => {
            this.snackBar.open('You have successfully purchased program.', undefined, { duration: 2000 });
            this.userHasProgram();
          },
          error: () => this.snackBar.open('An error occurred, program is not purchased.', undefined, { duration: 2000 })
        });
      }
    })
  }

  playVideo(){
    this.dialog.open(VideoDialogComponent, {
      data: { videoUrl: this.program?.videoUrl }
    });
  }

  loadValues(){
    this.service.getValuesByProgram(this.program.id).pipe(
      tap((response) => {
        response.forEach((item: any) => {
          if(!this.values.has(item.attribute.name)){
            this.values.set(item.attribute.name, [item.value])
          }else{
            const existingValues = this.values.get(item.attribute.name);
            if(existingValues){
              existingValues.push(item.value);
              this.values.set(item.attribute.name, existingValues);
            }
          }
        })
      })
    ).subscribe();
  }

  loadComments(){
    this.commentService.getByProgram(this.program.id, this.currentPage, this.pageSize).subscribe(data => {
      this.totalComments = data.totalElements;

      const avatarRequests = data.content.map((comment: any) => {
        if (comment.user.avatar) {
          return this.imageService.getUrl(comment.user.avatar)?.pipe(
            map(url => {
              comment.user.avatar = url;
              return comment;
            }),
            catchError(error => {
              console.error(`Failed to load image for avatar ${comment.user.avatar}`, error);
              return of(comment);
            })
          );
        } else {
          return of(comment);
        }
      });
  
      forkJoin(avatarRequests).subscribe((updatedComments: any) => {
        this.comments = updatedComments;
      });
    })
  }

  paginate(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadComments();
  }
}
