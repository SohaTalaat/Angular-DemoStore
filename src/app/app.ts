import { Component, signal } from '@angular/core';
// import { ProductList } from './product-list/product-list';
import { FavoriteProduct } from './favorite-product/favorite-product';
import { ProductCart } from './product-cart/product-cart';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, FavoriteProduct, ProductCart],
  styleUrl: './app.css',
  standalone: true,
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" routerLink="/"> <i class="bi bi-shop"></i> My Shop </a>

        <div class="navbar-nav ms-auto">
          <a class="nav-link" routerLink="/products" routerLinkActive="active">Products</a>
          <a class="nav-link" routerLink="/login" routerLinkActive="active">Login</a>
        </div>
      </div>
    </nav>

    <div class="container-fluid my-4">
      <div class="row">
        <!-- Main content area -->
        <div class="col-lg-6 col-md-12 mb-4">
          <router-outlet></router-outlet>
        </div>

        <!-- Sidebar with Cart and Favorites -->
        <div class="col-lg-6 col-md-12">
          <div class="row">
            <div class="col-12 mb-4">
              <app-product-cart></app-product-cart>
            </div>
            <div class="col-12">
              <app-favorite-product></app-favorite-product>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class App {
  protected readonly title = signal('productApp');
}
