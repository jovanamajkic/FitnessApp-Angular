import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../models/category.model';
import { DifficultyLevel } from '../../models/difficulty-level';
import { Location } from '../../models/location';
import { CategoryService } from '../../protected/services/category.service';
import { ImplicitReceiver } from '@angular/compiler';
import { Attribute } from '../../models/attribute.model';
import { AttributeValue } from '../../models/attribute-value.model';
import { AttributeService } from '../../protected/services/attribute.service';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.css'
})
export class FilterDialogComponent implements OnInit {
  filterForm: FormGroup;
  categories: Category[] = [];
  difficultyLevels = new Map<string, string>(
    Object.entries(DifficultyLevel)
  );
  locations = new Map<string, string>(
    Object.entries(Location)
  );
  attributes: Map<Attribute, AttributeValue[]> = new Map<Attribute, AttributeValue[]>();


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private attributeService: AttributeService
  ) {
    this.filterForm = this.fb.group({
      category: [''],
      attributeValues: [[]],
      dificultyLevel: [''],
      location: [''],
      priceMin: [0],
      priceMax: [1000],
      durationMin: [0],
      durationMax: [1000]
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onApply(): void {
    this.updateAttributesControl();
    this.dialogRef.close(this.filterForm.value);
  }

  onCategoryChange(event: any){
    this.removeAttributeControls();
    event.attributes.forEach((attr: any) => {
      this.attributeService.getValues(attr.id).subscribe(data => this.attributes.set(attr, data));
      this.addAttributeControl(attr);
    })
  }

  addAttributeControl(attribute: Attribute): void {
    const attributeControlName = attribute.name;
    if (!this.filterForm.contains(attributeControlName)) {
      this.filterForm.addControl(attributeControlName, new FormControl(''));
    }
  }
  
  removeAttributeControls(): void {
    const keys = Array.from(this.attributes.keys());
    keys.forEach((attr) => {
      if (this.filterForm.contains(attr.name)) {
        this.filterForm.removeControl(attr.name);
      }
    });
    this.attributes.clear();
  }

  updateAttributesControl(): void {
    const updatedValues: any[] = [];
    const keys = Array.from(this.attributes.keys());
    keys.forEach((attr) => {
      const value = this.filterForm.get(attr.name)?.value;
      if (value) {
        updatedValues.push(value);
        this.filterForm.removeControl(attr.name);
      }
    });
    this.filterForm.get('attributeValues')?.setValue(updatedValues);
  }

}
