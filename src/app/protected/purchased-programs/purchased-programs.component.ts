import { Component } from '@angular/core';
import { Program } from '../../models/program.model';
import { ProgramService } from '../../public/services/program.service';
import { TokenService } from '../../auth/services/token.service';
import { ImageService } from '../../services/image.service';
import { UserHasProgramService } from '../services/user-has-program.service';
import { catchError, forkJoin, map, merge, of, switchMap, tap } from 'rxjs';

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

    this.userHasProgramService.getByUser(id).pipe(
      switchMap(data => {
        const imageRequests = data.flatMap((program: any) =>
          program.images.map((image: any) =>
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
