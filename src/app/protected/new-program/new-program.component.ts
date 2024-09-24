import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgramService } from '../../public/services/program.service';
import { Category } from '../../models/category.model';
import { CategoryService } from '../services/category.service';
import { DifficultyLevel } from '../../models/difficulty-level';
import { Location } from '../../models/location';
import { MatDialog } from '@angular/material/dialog';
import { AttributesDialogComponent } from '../../shared-components/attributes-dialog/attributes-dialog.component';
import { Attribute } from '../../models/attribute.model';
import { AttributeValue } from '../../models/attribute-value.model';
import { ProgramRequest } from '../../models/program-request.model';
import { TokenService } from '../../auth/services/token.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProgramHasAttributeValueService } from '../services/program-has-attribute-value.service';
import { ProgramHasAttributeValueRequest } from '../../models/program-has-attribute-value-request.model';
import { Image } from '../../models/image.model';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-new-program',
  templateUrl: './new-program.component.html',
  styleUrl: './new-program.component.css'
})
export class NewProgramComponent implements OnInit {
  formProgram: FormGroup;
  categories: Category[] = [];
  images: any[] = [];
  difficultyLevels = new Map<string, string>(
    Object.entries(DifficultyLevel)
  );
  locations = new Map<string, string>(
    Object.entries(Location)
  );
  selectedValues: Map<Attribute, AttributeValue[]> = new Map<Attribute, AttributeValue[]>();
  programId: number = 0;
  files: File[] = [];

  constructor(
    private programService: ProgramService, 
    private builder: FormBuilder, 
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private tokenService: TokenService,
    private snackBar: MatSnackBar,
    private programHasAttributeValueService: ProgramHasAttributeValueService,
    private imageService: ImageService
  ){
    this.formProgram = this.builder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      category: [null, Validators.required],
      duration: [null, Validators.required],
      price: [null, Validators.required],
      difficultyLevel: [null, Validators.required],
      location: [null, Validators.required],
      instructor: [null, Validators.required],
      contact: [null, Validators.required],
      videoURL: [null],
      images: [[]]
    })
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
      console.log(this.categories);
    });
  }

  onLocationChange(value: any) {
    const videoUrlControl = this.formProgram.get('videoUrl');
    if (value === 'Online') {
      videoUrlControl?.setValidators([Validators.required]);
    } else {
      videoUrlControl?.clearValidators();
    }
    videoUrlControl?.updateValueAndValidity();
  }

  createProgram(){
    const categoryId = (this.formProgram.value.category as Category).id;
    const userId = this.tokenService.getUser().id;

    const request: ProgramRequest = {
      title: this.formProgram.value.title,
      description: this.formProgram.value.description,
      price: this.formProgram.value.price,
      dificultyLevel: this.formProgram.value.difficultyLevel,
      duration: this.formProgram.value.duration,
      location: this.formProgram.value.location,
      instructor: this.formProgram.value.instructor,
      contact: this.formProgram.value.contact,
      videoUrl: this.formProgram.value.videoURL,
      images: this.images,
      categoryId: categoryId,
      userId: userId
    };

    this.programService.create(request).subscribe({
      next: (data: any) => {
        this.programId = data.id;
        this.uploadImages();
        this.addAttributeValues();
      },
      error: () => this.snackBar.open('An error occurred, program is not created', undefined, { duration: 2000 }),
      complete: () => {
        this.formProgram.reset();
        this.snackBar.open('Program is created successfully', undefined, { duration: 2000 });
      }
    });

  }

  addAttributeValues(){
    const allValues = Array.from(this.selectedValues.values()).reduce((acc, val) => acc.concat(val), []);
    console.log(allValues);
    allValues.forEach(value => {
      const request: ProgramHasAttributeValueRequest = {
        programId: this.programId,
        attributeValueId: value.id
      };
      this.programHasAttributeValueService.insert(request).subscribe({
        error: () => this.snackBar.open('An error occurred.', undefined, { duration: 2000 })
      })
    });
  }

  onFileSelected(event: any){
    const input = event.target.files;

    if(input){
      for(let file of input){
        this.files.push(file);
        this.images.push(new Image(file.name, this.programId));
      }
    }
  }

  uploadImages(){
    this.files.forEach(file => {
      this.imageService.uploadImage(file).subscribe({
        error: () => this.snackBar.open('An error occurred, image is not uploaded.', undefined, { duration: 2000 })
      })
    })
  }

  onCategoryChange(event: any){
    let dialogRef = this.dialog.open(AttributesDialogComponent, {
      width: '400px',
      data: { category: event },
    });

    dialogRef.afterClosed().subscribe((res) => this.selectedValues = res);
  }

}
