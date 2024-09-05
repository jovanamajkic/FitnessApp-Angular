import { Component, OnInit } from '@angular/core';
import { Program } from '../../models/program.model';
import { ProgramService } from '../services/program.service';
import { PageEvent } from '@angular/material/paginator';
import { ImageService } from '../../services/image.service';
import { catchError, forkJoin, map, merge, of, switchMap, tap } from 'rxjs';

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
    this.programService.getPrograms().pipe(
      switchMap(data => {
        const imageRequests = data.flatMap(program =>
          program.images.map(image =>
            this.imageService.getUrl(image.url)?.pipe(
              map((url: string) => {
                image.url = url;
                return image;
              }),
              catchError(error => {
                console.error(`Failed to load image for url ${image.url}`, error);
                return of(null);
              })
            )
          )
        );

        return forkJoin(imageRequests).pipe(
          map(() => data)
        );
      })
    ).subscribe(updatedPrograms => {
      this.programs = updatedPrograms;
      this.totalPrograms = this.programs.length;
    });
  }

}
