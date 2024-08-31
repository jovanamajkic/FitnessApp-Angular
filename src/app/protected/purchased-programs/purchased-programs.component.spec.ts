import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedProgramsComponent } from './purchased-programs.component';

describe('PurchasedPtogramsComponent', () => {
  let component: PurchasedProgramsComponent;
  let fixture: ComponentFixture<PurchasedProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchasedProgramsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchasedProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
