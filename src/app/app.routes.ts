import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadComponent: () => import('./product-list/product-list').then((m) => m.ProductList),
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./product-details/product-details').then((m) => m.ProductDetails),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.LoginComponent),
  },
  {
    path: '404',
    loadComponent: () => import('./not-found/not-found').then((m) => m.NotFoundComponent),
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
