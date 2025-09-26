import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, effect, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCard } from '../product-card/product-card';
import { ProductService, Product } from '../product';
import { SearchFilterPipe } from '../custom-pipe';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCard, FormsModule],
  templateUrl: 'product-list.html',
})
export class ProductList implements OnInit {
  private productService = inject(ProductService);

  products = this.productService.products;
  loading = this.productService.loading;
  error = this.productService.error;
  searchText = signal<string>('');

  filteredProducts = computed(() => {
    const text = this.searchText().trim().toLowerCase();
    if (!text) return this.products();

    return this.products().filter((p) =>
      ['title', 'description', 'brand', 'category'].some((prop) =>
        (p as any)[prop]?.toLowerCase().includes(text)
      )
    );
  });

  constructor() {
    effect(() => {
      if (this.products().length > 0) {
        console.log('Products loaded:', this.products().length);
      }
    });
  }

  ngOnInit() {
    this.productService.loadProducts();
  }

  onSearch(text: string) {
    this.searchText.set(text);
  }
}
