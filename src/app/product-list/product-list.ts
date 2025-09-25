import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCard } from '../product-card/product-card';
import { ProductService, Product } from '../product';
import { SearchFilterPipe } from '../custom-pipe';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductCard, FormsModule, SearchFilterPipe],
  standalone: true,
  template: `
    <div class="card">
      <div class="card-header bg-primary text-white">
        <h3 class="card-title mb-3">
          <i class="bi bi-grid"></i> Product List ({{ products.length }})
        </h3>

        <!-- Search functionality -->
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Search products..."
            [(ngModel)]="searchText"
            (input)="onSearch()"
          />
          <span class="input-group-text">
            <i class="bi bi-search"></i>
          </span>
        </div>
      </div>

      <div class="card-body">
        @if (loading) {
        <div class="text-center py-4">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2">Loading products...</p>
        </div>
        } @if (error) {
        <div class="alert alert-danger">
          <i class="bi bi-exclamation-triangle"></i>
          {{ error }}
        </div>
        } @if (!loading && !error) {
        <div class="row g-3">
          @for (product of filteredProducts; track product.id) {
          <div class="col-lg-6 col-md-6 col-sm-12">
            <app-product-card [product]="product"></app-product-card>
          </div>
          }
        </div>
        } @if (!loading && filteredProducts.length === 0 && searchText) {
        <div class="text-center py-4">
          <i class="bi bi-search display-6 text-muted"></i>
          <p class="mt-2 text-muted">No products found for "{{ searchText }}"</p>
        </div>
        }
      </div>
    </div>
  `,
})
export class ProductList implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = true;
  error: string | null = null;
  searchText = '';
  searchProperties = ['title', 'description', 'brand', 'category'];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.error = null;

    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.products;
        this.filteredProducts = [...this.products];
        this.productService.setProducts(this.products);
        this.loading = false;
        console.log('Products loaded from API:', this.products.length, 'products');
      },
      error: (err) => {
        this.error = 'Failed to load products. Please try again.';
        this.loading = false;
        console.error('Error loading products:', err);
      },
    });
  }

  onSearch() {
    if (!this.searchText.trim()) {
      this.filteredProducts = [...this.products];
    } else {
      const searchFilterPipe = new SearchFilterPipe();
      this.filteredProducts = searchFilterPipe.transform(
        this.products,
        this.searchText,
        this.searchProperties
      );
    }
  }
}
