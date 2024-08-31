import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../services/category.service';
import { UserHasCategoryService } from '../services/user-has-category.service';
import { TokenService } from '../../auth/services/token.service';
import { forkJoin, map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-subscription',
  templateUrl: './category-subscription.component.html',
  styleUrl: './category-subscription.component.css'
})
export class CategorySubscriptionComponent implements OnInit {
  categories: Map<Category, boolean> = new Map<Category, boolean>;
  user: any;

  constructor(
    private categoryService: CategoryService,
    private service: UserHasCategoryService,
    private tokenService: TokenService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.loadCategories();
    this.user = this.tokenService.getUser();
  }

  loadCategories(){
    this.categoryService.getCategories().subscribe((data: any[]) => {
      const observables = data.map(item => 
        this.service.exists(this.user.id, item.id).pipe(map(exists => ({ item, exists })))
      );
  
      forkJoin(observables).subscribe(results => {
        results.forEach(({ item, exists }) => {
          this.categories.set(item, exists);
        });
      });
    });
  }

  subscribe(category: Category){
    const request = {
      userId: this.user.id,
      categoryId: category.id
    }
    this.service.subscribe(request).subscribe({
      next: () => {
        this.snackBar.open('You have successfully subscribed to category.', undefined, { duration: 2000 });
        this.categories.set(category, false);
      },
      error: () => this.snackBar.open('An error occurred.', undefined, { duration: 2000 })
    })
  }

  unsubscribe(category: Category){
    this.service.unsubscribe(this.user.id, category.id).subscribe({
      next: () => {
        this.snackBar.open('You have successfully unsubscribed from category.', undefined, { duration: 2000 });
        this.categories.set(category, false);
      },
      error: () => this.snackBar.open('An error occurred.', undefined, { duration: 2000 })
    })
  }

}
