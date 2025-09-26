import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductService } from '../product';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  standalone: true,
  styleUrl: './product-details.css',
  templateUrl: 'product-details.html',
})
export class ProductDetails {
  product = signal<Product | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  currentImage = signal<string>('');

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadProduct(id);
    } else {
      this.error.set('Invalid product ID');
      this.loading.set(false);
    }
  }

  async loadProduct(id: number) {
    this.loading.set(true);
    this.error.set(null);

    try {
      const product = await this.productService.getProductById(id);
      if (product) {
        this.product.set(product);
        this.currentImage.set(product.thumbnail);
        console.log('Product details loaded:', product);
      } else {
        this.error.set('Product not found.');
      }
    } catch (err) {
      this.error.set('Product not found or failed to load.');
      console.error('Error loading product:', err);
    } finally {
      this.loading.set(false);
    }
  }

  changeMainImage(image: string) {
    this.currentImage.set(image);
    if (this.product()) {
      this.product.update((p) => (p ? { ...p, thumbnail: image } : p));
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
