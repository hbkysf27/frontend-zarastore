/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@zarafe/products';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit{
  products=[];


  constructor(private productsService : ProductsService)
  {}

  ngOnInit():void{
    this._getProducts();
  }

  private _getProducts(){
    this.productsService.getProducts().subscribe(products=>{
      this.products = products;
    });
  }

  // updateProduct(productid: string) {
  //   this.router.navigateByUrl(`products/form/${productid}`);
  // }

  // deleteProduct(productId: string) {
  //   this.confirmationService.confirm({
  //     message: 'Do you want to delete this Product?',
  //     header: 'Delete Product',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.productsService.deleteProduct(productId).subscribe(
  //         () => {
  //           this._getProducts();
  //           this.messageService.add({
  //             severity: 'success',
  //             summary: 'Success',
  //             detail: 'Product is deleted!'
  //           });
  //         },
  //         () => {
  //           this.messageService.add({
  //             severity: 'error',
  //             summary: 'Error',
  //             detail: 'Product is not deleted!'
  //           });
  //         }
  //       );
  //     }
  //   });
  }
