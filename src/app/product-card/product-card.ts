import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product, ProductService } from '../product';
import { Router } from '@angular/router';
import { ShadowDirective } from '../shadow';
import { CurrencyPipe, SliceDescriptionPipe } from '../custom-pipe';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  standalone: true,
  template: `
    <div class="card h-100">
      <div class="position-relative">
        <img
          [src]="product.thumbnail"
          class="card-img-top"
          [alt]="product.title"
          style="height: 200px; object-fit: cover; cursor: pointer;"
          shadow
          (mouseenter)="showInfo = true"
          (mouseleave)="showInfo = false"
        />

        <!-- Hover overlay with rating and stock info -->
        @if (showInfo) {
        <div
          class="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-dark bg-opacity-75 text-white"
        >
          <div class="text-center">
            <p class="mb-1">
              <i class="bi bi-star-fill text-warning"></i>
              <strong>Rating:</strong> {{ product.rating }}/5
            </p>
            <p class="mb-1">
              <i class="bi bi-box-seam"></i>
              <strong>Stock:</strong> {{ product.stock }} items
            </p>
            @if (product.reviews.length > 0) {
            <p class="mb-0">
              <i class="bi bi-chat-dots"></i>
              <strong>Reviews:</strong> {{ product.reviews.length }}
            </p>
            }
          </div>
        </div>
        }
      </div>

      <div class="card-body d-flex flex-column">
        <!-- Clickable title that navigates to product details -->
        <h5 class="card-title text-primary" style="cursor: pointer;" (click)="navigateToDetails()">
          {{ product.title }}
        </h5>

        <p class="card-text text-muted small flex-grow-1">
          {{ product.description | slice : 30 : 50 }}
        </p>

        <div class="d-flex justify-content-between align-items-center mb-3">
          <span class="h5 text-success mb-0">
            {{ product.price | currency : 'USD' }}
          </span>
          @if (product.discountPercentage > 0) {
          <span class="badge bg-danger"> -{{ product.discountPercentage }}% </span>
          }
        </div>

        <div class="d-flex gap-2">
          <button class="btn btn-success btn-sm flex-fill" (click)="addToCart(product)">
            <i class="bi bi-cart-plus"></i> Add to Cart
          </button>
          <button class="btn btn-warning btn-sm flex-fill" (click)="addToFavorites(product)">
            <i class="bi bi-heart"></i> Favorite
          </button>
        </div>
      </div>
    </div>
  `,
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
