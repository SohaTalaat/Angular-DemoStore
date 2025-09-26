import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Product, ProductService } from '../product';

@Component({
  selector: 'app-favorite-product',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: 'favorite-product.html',
})
export class FavoriteProduct {
  constructor(private productService: ProductService) {}

  favorites = () => this.productService.favorites();

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }

  removeFromFavorites(productId: number) {
    this.productService.removeFromFavorites(productId);
  }
}
