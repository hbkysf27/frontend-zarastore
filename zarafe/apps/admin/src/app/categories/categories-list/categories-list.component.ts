/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
import { CategoriesService, Category } from '@zarafe/products';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent {
  categories: Category[]=[];


  constructor(private categriesService: CategoriesService,private messageService: MessageService,
     private confirmationService: ConfirmationService, private router: Router) {}
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this._getCategories();

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
      this.categriesService.getCategories().subscribe(cats =>{
        this.categories=cats;
      });
    }



}
