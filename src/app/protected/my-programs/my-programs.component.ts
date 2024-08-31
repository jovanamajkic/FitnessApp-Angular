import { Component, OnInit } from '@angular/core';
import { Program } from '../../models/program.model';
import { ProgramService } from '../../public/services/program.service';
import { TokenService } from '../../auth/services/token.service';
import { ImageService } from '../../services/image.service';
import { catchError, forkJoin, map, of } from 'rxjs';

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
    this.programService.getByUser(id).subscribe(data => {
      this.programs = data;
      this.totalPrograms = this.programs.length;
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
