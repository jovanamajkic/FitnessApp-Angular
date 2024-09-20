import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Program } from '../../models/program.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { ProgramHasAttributeValueService } from '../../protected/services/program-has-attribute-value.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrl: './program-list.component.css'
})
export class ProgramListComponent implements OnChanges {
  @Input() programs: Program[] = [];
  pagedPrograms: Program[] = [];
  originalPrograms: Program[] = [];
  @Input() totalPrograms = 0;
  pageSize = 8;
  currentPage = 0;
  filterData: any = null;
  searchData: any = null;

  constructor(
    private router: Router, 
    private dialog: MatDialog,
    private service: ProgramHasAttributeValueService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['programs']) {
      this.originalPrograms = this.programs;
      this.applyFilter();
    }
  }

  viewDetails(programDetails: Program): void {
    this.router.navigate(['/public/program', programDetails.id], { state: { program: programDetails } });
  }

  openFilterDialog(): void {
    let dialogRef;
    
    dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.currentPage = 0;
      this.filterData = result;
      this.applyFilter();
    });
  }

  openSearchDialog(): void {
    let dialogRef;
    
    dialogRef = this.dialog.open(SearchDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.currentPage = 0;
      this.searchData = result;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    if (this.filterData) {
      const requests = this.filterData.attributeValues.map((value: any) =>
        this.service.getProgramsByValue(value.id)
      );

      forkJoin(requests).subscribe((results: any) => {
        const valuePrograms = results.flat();
        console.log(valuePrograms);

        this.programs = this.programs.filter(program => {
          return (!this.filterData.category || program.category.id === this.filterData.category.id) &&
                 (!this.filterData.dificultyLevel || program.dificultyLevel.toString() === this.filterData.dificultyLevel.toString()) &&
                 (!this.filterData.location || program.location.toString() === this.filterData.location.toString()) &&
                 (this.filterData.priceMin == null || program.price >= this.filterData.priceMin) &&
                 (this.filterData.priceMax == null || program.price <= this.filterData.priceMax) &&
                 (this.filterData.durationMin == null || program.duration >= this.filterData.durationMin) &&
                 (this.filterData.durationMax == null || program.duration <= this.filterData.durationMax) &&
                 (valuePrograms.length === 0 || valuePrograms.some((p: any) => p.id === program.id));
        });
      this.totalPrograms = this.programs.length;
      this.slicePrograms();
    });

    } else if (this.searchData) {
      this.programs = this.programs.filter(program => {
        return (!this.searchData.title || program.title.toLowerCase().includes(this.searchData.title.toLowerCase())) &&
               (!this.searchData.description || program.description.toLowerCase().includes(this.searchData.description.toLowerCase())) &&
               (!this.searchData.instructor || program.instructor.toLowerCase().includes(this.searchData.instructor.toLowerCase())) &&
               (!this.searchData.contact || program.contact.toLowerCase().includes(this.searchData.contact.toLowerCase()));
      });
      this.totalPrograms = this.programs.length;
      this.slicePrograms();

    } else {
      this.slicePrograms();
    }
  }

  slicePrograms(){
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.pagedPrograms = this.programs.slice(start, end);
  }

  paginate(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.slicePrograms();
  }

  resetPrograms(){
    this.programs = this.originalPrograms;
    this.totalPrograms = this.programs.length;
    this.slicePrograms();
  }
}
