import { Component, OnInit } from '@angular/core';
import { Program } from '../../models/program.model';
import { ProgramService } from '../services/program.service';
import { PageEvent } from '@angular/material/paginator';
import { ImageService } from '../../services/image.service';
import { catchError, forkJoin, map, of } from 'rxjs';

@Component({
  selector: 'app-all-programs',
  templateUrl: './all-programs.component.html',
  styleUrl: './all-programs.component.css'
})
export class AllProgramsComponent implements OnInit {
  programs: Program[] = [];
  totalPrograms = 0;

  constructor(
    private programService: ProgramService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms(): void {
    this.programService.getPrograms().subscribe(data => {
      this.programs = data;
      this.totalPrograms = this.programs.length;
      console.log(this.programs);
      this.loadImages();
    });
  }

  loadImages(): void {
    const imageRequests = this.programs.map(program =>
      program.images.map(image =>
        this.imageService.getUrl(image.url)?.pipe(
          map((data: string) => image.url = data),
          catchError(error => {
            console.error(`Failed to load image for url ${image.url}`, error);
            return of(null);
          })
        )
      )
    ).flat();
  
    forkJoin(imageRequests).subscribe(() => {
      console.log(this.programs[this.programs.length - 1].images[0]);
      
    });
  }

}
