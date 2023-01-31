import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '@zarafe/orders';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-products-page',
  templateUrl: './products-page.component.html',
  styles: [
  ]
})
export class ProductsPageComponent implements OnInit, OnDestroy{
  product: Product;
  endSubs$: Subject<any> = new Subject();
  quantity: number;

  constructor(private prodService: ProductsService, private route: ActivatedRoute, private cartservice: CartService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.productid) {
        this._getProduct(params.productid);
      }
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.next;
    this.endSubs$.complete();
  }

  addProductToCart() {}

  private _getProduct(id: string) {
    this.prodService
      .getProduct(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((resProduct) => {
        this.product = resProduct;
      });
  }
}
