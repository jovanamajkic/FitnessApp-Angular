import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyProgramDialogComponent } from './buy-program-dialog.component';

describe('BuyProgramDialogComponent', () => {
  let component: BuyProgramDialogComponent;
  let fixture: ComponentFixture<BuyProgramDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyProgramDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyProgramDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
