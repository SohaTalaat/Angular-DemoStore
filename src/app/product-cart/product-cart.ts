import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService, CartItem } from '../product';

@Component({
  selector: 'app-product-cart',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: 'product-cart.html',
})
export class ProductCart {
  constructor(public productService: ProductService) {}

  cart = () => this.productService.cart();

  removeFromCart(productId: number) {
    this.productService.removeFromCart(productId);
  }

  getTotal(): number {
    return this.cart().reduce((sum, item) => sum + item.price, 0);
  }
}
