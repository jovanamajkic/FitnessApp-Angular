import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyExercisesComponent } from './daily-exercises.component';

describe('DailyExercisesComponent', () => {
  let component: DailyExercisesComponent;
  let fixture: ComponentFixture<DailyExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyExercisesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
