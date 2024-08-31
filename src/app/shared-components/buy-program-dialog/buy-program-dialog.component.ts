import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-buy-program-dialog',
  templateUrl: './buy-program-dialog.component.html',
  styleUrl: './buy-program-dialog.component.css'
})
export class BuyProgramDialogComponent {
  isCardSelected = false;
  form: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<BuyProgramDialogComponent>,
    private builder: FormBuilder
  ){
    this.form = this.builder.group({
      payment: [null, Validators.required],
      card: [null]
    })
  }

  onSelectionChange(event: any){
    const cardControl = this.form.get('card');
    if(event.value === 'Credit card' || event.value === 'PayPal'){
      this.isCardSelected = true;
      cardControl?.addValidators(Validators.required);
    }else{
      this.isCardSelected = false;
      cardControl?.clearValidators();
    }
    cardControl?.updateValueAndValidity();
  }

  onConfirm(){
    this.dialogRef.close('confirm');
  }

}
