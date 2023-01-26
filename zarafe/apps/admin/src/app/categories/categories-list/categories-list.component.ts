/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
import { CategoriesService, Category } from '@zarafe/products';


@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent {
  categories: Category[]=[];


  constructor(private categriesService: CategoriesService){}
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.categriesService.getCategories().subscribe(cats =>{
      this.categories=cats;
    })
  }




}
