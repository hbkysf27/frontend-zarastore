import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styles: [
  ]
})
export class FeaturedProductsComponent {

  featuredProducts: Product[] = [];
  endSubs$: Subject<any> = new Subject();

  constructor(private prodService: ProductsService) {}
  ngOnInit(): void {
    this._getFeaturedProducts();
  }

  ngOnDestroy(): void {
    this.endSubs$.next;
    this.endSubs$.complete();
  }

  private _getFeaturedProducts() {
    this.prodService
      .getFeaturedProducts(4)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((products) => {
        this.featuredProducts = products;
      });
  }


}
