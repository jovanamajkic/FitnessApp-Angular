import { Component } from '@angular/core';
import { Program } from '../../models/program.model';
import { ProgramService } from '../../public/services/program.service';
import { TokenService } from '../../auth/services/token.service';
import { ImageService } from '../../services/image.service';
import { UserHasProgramService } from '../services/user-has-program.service';
import { catchError, forkJoin, map, merge, of, tap } from 'rxjs';

@Component({
  selector: 'app-purchased-programs',
  templateUrl: './purchased-programs.component.html',
  styleUrl: './purchased-programs.component.css'
})
export class PurchasedProgramsComponent {
  programs: Program[] = [];
  userHasPrograms: any[] = [];
  totalPrograms = 0;

  constructor(
    private userHasProgramService: UserHasProgramService,
    private tokenService: TokenService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms(): void {
    const id = this.tokenService.getUser().id;

    this.userHasProgramService.getByUser(id).subscribe(data => {
      this.programs = data;
      this.totalPrograms = this.programs.length;
      this.loadImages();
    })
  }

  loadImages(): void {
    const imageRequests = this.programs
      .filter(program => program.images)
      .map(program =>
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
  
    merge(...imageRequests).subscribe();
  }
}
