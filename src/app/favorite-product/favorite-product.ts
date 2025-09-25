import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Product, ProductService } from '../product';
import { CurrencyPipe } from '../custom-pipe';

@Component({
  selector: 'app-favorite-product',
  imports: [CommonModule, CurrencyPipe],
  template: `
    <div class="card">
      <div class="card-header bg-warning text-dark">
        <h4 class="card-title mb-0">
          <i class="bi bi-heart-fill"></i> Favorites ({{ favorites().length }})
        </h4>
      </div>

      <div class="card-body">
        @if (favorites().length === 0) {
        <div class="text-center text-muted py-3">
          <i class="bi bi-heart display-6"></i>
          <p class="mt-2">No favorites yet</p>
        </div>
        } @if (favorites().length > 0) { @for (product of favorites(); track product.id) {
        <div class="d-flex align-items-center justify-content-between border-bottom py-2">
          <div class="d-flex align-items-center">
            <img
              [src]="product.thumbnail"
              class="rounded me-3"
              style="width: 50px; height: 50px; object-fit: cover;"
              [alt]="product.title"
            />
            <div>
              <h6 class="mb-0">{{ product.title }}</h6>
              <small class="text-success">{{ product.price | currency : '$' }}</small>
              <br />
              <small class="text-muted">
                <i class="bi bi-star-fill text-warning"></i> {{ product.rating }}
              </small>
            </div>
          </div>
          <div>
            <button class="btn btn-success btn-sm me-1" (click)="addToCart(product)">
              <i class="bi bi-cart-plus"></i>
            </button>
            <button class="btn btn-outline-danger btn-sm" (click)="removeFromFavorites(product.id)">
              <i class="bi bi-x"></i>
            </button>
          </div>
        </div>
        } }
      </div>
    </div>
  `,
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
