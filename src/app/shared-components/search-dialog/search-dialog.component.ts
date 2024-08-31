import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrl: './search-dialog.component.css'
})
export class SearchDialogComponent {
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){
    this.searchForm = this.fb.group({
      title: [''],
      description: [''],
      instructor: [''],
      contact: ['']
    });
  }

  onApply(): void {
    console.log(this.searchForm.value);
    this.dialogRef.close(this.searchForm.value);
  }

}
