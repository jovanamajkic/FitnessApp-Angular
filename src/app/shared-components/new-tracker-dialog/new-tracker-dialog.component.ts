import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityTrackerService } from '../../protected/services/activity-tracker.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivityTrackerRequest } from '../../models/activity-tracker.request';
import { TokenService } from '../../auth/services/token.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-tracker-dialog',
  templateUrl: './new-tracker-dialog.component.html',
  styleUrl: './new-tracker-dialog.component.css'
})
export class NewTrackerDialogComponent {
  trackerForm: FormGroup;

  constructor(
    private trackerService: ActivityTrackerService,
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<NewTrackerDialogComponent>,
    private tokenService: TokenService,
    private snackBar: MatSnackBar
  ){
    this.trackerForm = this.builder.group({
      exercise: [null, Validators.required],
      duration: [null, Validators.required],
      intensity: [null, Validators.required],
      result: [null, Validators.required],
      bodyWeight: [null, Validators.required]
    })
  }

  onAdd(){
    const user = this.tokenService.getUser();

    const request: ActivityTrackerRequest = {
      exercise: this.trackerForm.value.exercise,
      duration: this.trackerForm.value.duration,
      intensity: this.trackerForm.value.intensity,
      result: this.trackerForm.value.result,
      bodyWeight: this.trackerForm.value.bodyWeight,
      userId: user.id
    }

    this.trackerService.create(request).subscribe({
      next: (result) => {
        this.trackerForm.reset();
        this.snackBar.open('Activity tracker is successfully added.', undefined, { duration: 2000 });
        this.dialogRef.close(result);
      },
      error: () => this.snackBar.open('An error occurred.', undefined, { duration: 2000 })
    });

  }

}
