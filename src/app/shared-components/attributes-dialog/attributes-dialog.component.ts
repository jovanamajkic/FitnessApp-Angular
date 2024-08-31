import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AttributeService } from '../../protected/services/attribute.service';
import { Attribute } from '../../models/attribute.model';
import { AttributeValue } from '../../models/attribute-value.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-attributes-dialog',
  templateUrl: './attributes-dialog.component.html',
  styleUrl: './attributes-dialog.component.css'
})
export class AttributesDialogComponent implements OnInit {
  valuesMap: Map<Attribute, AttributeValue[]> = new Map<Attribute, AttributeValue[]>();
  selectedValues: Map<Attribute, AttributeValue[]> = new Map<Attribute, AttributeValue[]>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { category: Category },
    private service: AttributeService,
    public dialogRef: MatDialogRef<AttributesDialogComponent>
  ){}

  ngOnInit(): void {
    this.loadAttributes();
  }

  loadAttributes(){
    const attributes = this.data.category.attributes;

    attributes.forEach(attribute => {
      this.service.getValues(attribute.id).subscribe((values: any[]) => {
        this.valuesMap.set(attribute, values);
      })
    })
  }

  onSelectionChange(values: AttributeValue[], attribute: Attribute){
    this.selectedValues.set(attribute, values);
  }

  onSave(){
    this.dialogRef.close(this.selectedValues);
  }

}
