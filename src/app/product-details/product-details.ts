import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductService } from '../product';
import { CurrencyPipe } from '../custom-pipe';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, CurrencyPipe],
  standalone: true,
  styleUrl: './product-details.css',
  template: `
    <div class="card">
      <div class="card-header bg-info text-white d-flex justify-content-between align-items-center">
        <h3 class="card-title mb-0"><i class="bi bi-info-circle"></i> Product Details</h3>
        <button class="btn btn-outline-light btn-sm" (click)="goBack()">
          <i class="bi bi-arrow-left"></i> Back to Products
        </button>
      </div>

      <div class="card-body">
        @if (loading) {
        <div class="text-center py-4">
          <div class="spinner-border text-info" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2">Loading product details...</p>
        </div>
        } @if (error) {
        <div class="alert alert-danger">
          <i class="bi bi-exclamation-triangle"></i>
          {{ error }}
        </div>
        } @if (product && !loading) {
        <div class="row">
          <div class="col-md-6">
            <div class="product-images">
              <img
                [src]="product.thumbnail"
                [alt]="product.title"
                class="img-fluid rounded shadow mb-3"
              />

              @if (product.images && product.images.length > 1) {
              <div class="row g-2">
                @for (image of product.images.slice(0, 4); track image) {
                <div class="col-3">
                  <img
                    [src]="image"
                    [alt]="product.title"
                    class="img-fluid rounded shadow-sm"
                    style="height: 60px; object-fit: cover; cursor: pointer;"
                    (click)="changeMainImage(image)"
                  />
                </div>
                }
              </div>
              }
            </div>
          </div>

          <div class="col-md-6">
            <h2 class="text-primary">{{ product.title }}</h2>
            <p class="text-muted">{{ product.description }}</p>

            <div class="row mb-3">
              <div class="col-6">
                <strong>Price:</strong>
                <span class="text-success h4">{{ product.price | currency : '$' }}</span>
              </div>
              @if (product.discountPercentage > 0) {
              <div class="col-6">
                <span class="badge bg-danger fs-6"> {{ product.discountPercentage }}% OFF </span>
              </div>
              }
            </div>

            <div class="row mb-3">
              <div class="col-6">
                <strong>Rating:</strong>
                <span class="text-warning">
                  <i class="bi bi-star-fill"></i> {{ product.rating }}/5
                </span>
              </div>
              <div class="col-6">
                <strong>Stock:</strong>
                <span [class]="product.stock > 10 ? 'text-success' : 'text-warning'">
                  {{ product.stock }} items
                </span>
              </div>
            </div>

            <div class="mb-3">
              <strong>Brand:</strong> {{ product.brand }}<br />
              <strong>Category:</strong> {{ product.category }}<br />
              <strong>SKU:</strong> {{ product.sku }}
            </div>

            @if (product.tags && product.tags.length > 0) {
            <div class="mb-4">
              <strong>Tags:</strong>
              @for (tag of product.tags; track tag) {
              <span class="badge bg-secondary me-1">{{ tag }}</span>
              }
            </div>
            }

            <div class="d-flex gap-2 mb-3">
              <button class="btn btn-success" (click)="addToCart(product)">
                <i class="bi bi-cart-plus"></i> Add to Cart
              </button>
              <button class="btn btn-warning" (click)="addToFavorites(product)">
                <i class="bi bi-heart"></i> Add to Favorites
              </button>
            </div>

            @if (product.reviews.length > 0) {
            <div class="accordion">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#reviews"
                  >
                    Reviews ({{ product.reviews.length || 0 }})
                  </button>
                </h2>
                <div id="reviews" class="accordion-collapse collapse">
                  <div class="accordion-body">
                    @for (review of product.reviews.slice(0, 3); track review.reviewerName) {
                    <div class="border-bottom pb-2 mb-2">
                      <div class="d-flex justify-content-between">
                        <strong>{{ review.reviewerName }}</strong>
                        <span class="text-warning">
                          @for (star of [1,2,3,4,5]; track star) {
                          <i
                            class="bi"
                            [class]="star <= review.rating ? 'bi-star-fill' : 'bi-star'"
                          ></i>
                          }
                        </span>
                      </div>
                      <p class="mb-0 small">{{ review.comment }}</p>
                    </div>
                    }
                  </div>
                </div>
              </div>
            </div>
            }
          </div>
        </div>
        }
      </div>
    </div>
  `,
})
export class ProductDetails implements OnInit {
  product: Product | null = null;
  loading = true;
  error: string | null = null;
  currentImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadProduct(id);
    } else {
      this.error = 'Invalid product ID';
      this.loading = false;
    }
  }

  loadProduct(id: number) {
    this.loading = true;
    this.error = null;

    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.currentImage = product.thumbnail;
        this.loading = false;
        console.log('Product details loaded:', product);
      },
      error: (err) => {
        this.error = 'Product not found or failed to load.';
        this.loading = false;
        console.error('Error loading product:', err);
      },
    });
  }

  changeMainImage(image: string) {
    this.currentImage = image;
    if (this.product) {
      this.product.thumbnail = image;
    }
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }

  addToFavorites(product: Product) {
    this.productService.addToFavorites(product);
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
