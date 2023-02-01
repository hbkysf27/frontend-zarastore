import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '@zarafe/orders';
import { CartItem } from 'libs/orders/src/lib/models/cart';
import { Product } from '../../models/product';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent implements OnInit {
  @Input () product: Product;

  constructor(private cartService: CartService){}


  ngOnInit(): void{}
  
  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1
    };
    this.cartService.setCartItem(cartItem);
  }



}
