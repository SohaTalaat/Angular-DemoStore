import { Injectable, signal, inject } from '@angular/core';

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  images: string[];
  thumbnail: string;
  tags?: string[];
  sku?: string;
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews: Review[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
}

export interface CartItem {
  productId: number;
  title: string;
  price: number;
  thumbnail: string;
}

export interface ApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products?limit=10&skip=20';

  products = signal<Product[]>([]);
  cart = signal<CartItem[]>([]);
  favorites = signal<Product[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    this.loadProducts();
  }

  async loadProducts() {
    this.loading.set(true);
    this.error.set(null);

    try {
      const res = await fetch(this.apiUrl);
      const data: ApiResponse = await res.json();
      this.products.set(data.products);
    } catch (err) {
      this.error.set('Failed to load products');
    } finally {
      this.loading.set(false);
    }
  }

  async getProductById(id: number): Promise<Product | null> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const product: Product = await res.json();
      return product;
    } catch (err) {
      this.error.set('Failed to fetch product');
      return null;
    } finally {
      this.loading.set(false);
    }
  }

  addToCart(product: Product) {
    const currentCart = this.cart();
    const existingItem = currentCart.find((item) => item.productId === product.id);

    if (!existingItem) {
      const cartItem: CartItem = {
        productId: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      };
      this.cart.set([...currentCart, cartItem]);
      console.log(`Added to cart: ${product.title}`);
    } else {
      console.log(`Product ${product.title} is already in cart`);
    }
  }

  removeFromCart(productId: number) {
    this.cart.set(this.cart().filter((item) => item.productId !== productId));
    console.log(`Removed product with ID: ${productId}`);
  }

  addToFavorites(product: Product) {
    if (!this.favorites().some((fav) => fav.id === product.id)) {
      this.favorites.update((favs) => [...favs, product]);
      console.log(`Added to favorites: ${product.title}`);
    } else {
      console.log(`Product ${product.title} is already in favorites`);
    }
  }

  removeFromFavorites(productId: number) {
    this.favorites.update((favs) => favs.filter((fav) => fav.id !== productId));
    console.log(`Removed favorite with ID: ${productId}`);
  }
}
