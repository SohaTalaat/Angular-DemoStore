# 🛍️ Angular DemoStore

A demo e-commerce web application built with **Angular 20** to showcase modern Angular features such as **standalone components, signals, and the new control flow syntax**.

## 🚀 Features

- 📦 Product listing with images, ratings, and prices
- ❤️ Add/remove products from favorites
- 🛒 Add to cart with quantity management
- 🔄 Uses Angular signals for state management
- 🎨 Styled with Bootstrap icons and responsive design

## 📂 Project Structure

src/
├── app/
│ ├── app.ts # Main app component
│ ├── app.routes.ts # Application routes configuration
│ ├── product.ts # Product service with interfaces
│ ├── shadow.directive.ts # Custom shadow directive
│ ├── custom.pipes.ts # All custom pipes (currency, slice, search)
│ │
│ ├── product-list/
│ │ └── product-list.ts # Product list component (default route)
│ │
│ ├── product-card/
│ │ └── product-card.ts # Product card component with input
│ │
│ ├── product-details/
│ │ └── product-details.ts # Product details component
│ │
│ ├── product-cart/
│ │ └── product-cart.ts # Shopping cart component
│ │
│ ├── favorite-product/
│ │ └── favorite-product.ts # Favorites component
│ │
│ ├── login/
│ │ └── login.ts # Login component (lazy loaded)
│ │
│ └── not-found/
│ └── not-found.ts # 404 Not found component
│
├── main.ts # Application bootstrap
├── index.html # Main HTML file with Bootstrap CDN
└── styles.css # Global styles (optional)

## 🛠️ Tech Stack

- [Angular 20](https://angular.dev/) – Frontend framework
- [Bootstrap](https://getbootstrap.com/) – UI styling
- [Bootstrap Icons](https://icons.getbootstrap.com/) – Icon set

## ▶️ Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/SohaTalaat/Angular-DemoStore.git
   cd angular-DemoStore
   ```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
ng serve
```

4. Open in your browser:

```bash
http://localhost:4200/
```

## 📜 License

This project is licensed under the MIT License.
