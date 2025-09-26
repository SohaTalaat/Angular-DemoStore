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
  templateUrl: 'app.html',
})
export class App {
  protected readonly title = signal('productApp');
}
