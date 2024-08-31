import { Component, OnInit } from '@angular/core';
import { ExerciseApiService } from '../services/exercise-api.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-daily-exercises',
  templateUrl: './daily-exercises.component.html',
  styleUrl: './daily-exercises.component.css'
})
export class DailyExercisesComponent implements OnInit {
  exercises: any[] = [];
  exercisesPage: any[] = [];

  pageSize = 5;
  pageSizeOptions: number[] = [2, 5, 7, 10];
  pageEvent: any;

  constructor(
    private exerciseApiService: ExerciseApiService
  ) { }

  ngOnInit(): void {
    this.exerciseApiService.getExercises().subscribe(data => {
      this.exercises = data;
      this.exercisesPage = this.exercises.slice(0, this.pageSize);
    });
  }

  handlePageEvent(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.exercisesPage = this.exercises.slice(startIndex, endIndex);
  }

}
