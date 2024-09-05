import { Component, OnInit } from '@angular/core';
import { Program } from '../../models/program.model';
import { ProgramService } from '../../public/services/program.service';
import { TokenService } from '../../auth/services/token.service';
import { ImageService } from '../../services/image.service';
import { catchError, forkJoin, map, merge, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-my-programs',
  templateUrl: './my-programs.component.html',
  styleUrl: './my-programs.component.css'
})
export class MyProgramsComponent implements OnInit{
  programs: Program[] = [];
  totalPrograms = 0;

  constructor(
    private programService: ProgramService, 
    private tokenService: TokenService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms(): void {
    const id = this.tokenService.getUser().id;

    this.programService.getByUser(id).pipe(
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
