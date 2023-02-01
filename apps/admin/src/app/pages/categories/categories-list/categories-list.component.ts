/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@zarafe/products';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categories: Category[]=[];
  endsubs$:Subject<any>=new Subject();


  constructor(private categriesService: CategoriesService,private messageService: MessageService,
     private confirmationService: ConfirmationService, private router: Router) {}
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this._getCategories();
    this.endsubs$.complete();

  }
  ngOnDestroy() {
    // this.endsubs$.next;
    // this.endsubs$.next();
    this.endsubs$.complete();
  }


  deleteCategory(categoryId:string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete this category?',
      header: 'Delete Catefory',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categriesService.deleteCategory(categoryId).subscribe(() =>{
          this._getCategories()
          this.messageService.add({severity:'success', summary:'success', detail:'Category Deleted'});
        },
        () => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Category Not Deleted'});
        }
        );
      },
});

  }

  updateCategory(categoryid: string){
    this.router.navigateByUrl(`categories/form/${categoryid}`);

  }


    private _getCategories(){
      this.categriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe(cats =>{
        this.categories=cats;
      });
    }



}
