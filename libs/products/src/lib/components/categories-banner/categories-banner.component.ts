import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styles: [
  ]
})
export class CategoriesBannerComponent implements OnInit{

  categories:Category[]=[];
  endSubs$: Subject<any>=new Subject();
  constructor(private categoriesService:CategoriesService){}

  ngOnInit(): void{
    this.categoriesService
      .getCategories().pipe(takeUntil(this.endSubs$)).subscribe((categories) => {
        this.categories = categories;
      });

  }

  ngOnDestroy() {
    this.endSubs$.next;
    this.endSubs$.complete();
  }

}
