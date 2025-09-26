import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product, ProductService } from '../product';
import { Router } from '@angular/router';
import { ShadowDirective } from '../shadow';
import { SliceDescriptionPipe } from '../custom-pipe';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, CurrencyPipe],
  standalone: true,
  templateUrl: 'product-card.html',
})
export class ProductCard {
  @Input() product!: Product;
  showInfo = false;

  constructor(private productService: ProductService, private router: Router) {}

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }

  addToFavorites(product: Product) {
    this.productService.addToFavorites(product);
  }

  navigateToDetails() {
    this.router.navigate(['/product', this.product.id]);
  }
}
