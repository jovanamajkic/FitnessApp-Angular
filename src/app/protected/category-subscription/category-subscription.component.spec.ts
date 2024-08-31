import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySubscriptionComponent } from './category-subscription.component';

describe('CategorySubscriptionComponent', () => {
  let component: CategorySubscriptionComponent;
  let fixture: ComponentFixture<CategorySubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategorySubscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorySubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
