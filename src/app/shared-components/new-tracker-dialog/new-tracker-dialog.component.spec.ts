import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTrackerDialogComponent } from './new-tracker-dialog.component';

describe('NewTrackerDialogComponent', () => {
  let component: NewTrackerDialogComponent;
  let fixture: ComponentFixture<NewTrackerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewTrackerDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewTrackerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
