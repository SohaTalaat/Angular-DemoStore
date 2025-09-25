import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  standalone: true,
  template: `
    <div class="card mx-auto" style="max-width: 400px;">
      <div class="card-header bg-success text-white text-center">
        <h3 class="card-title mb-0"><i class="bi bi-person-circle"></i> Login</h3>
      </div>

      <div class="card-body">
        <form (ngSubmit)="onLogin()" #loginForm="ngForm">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              [(ngModel)]="loginData.email"
              required
              #email="ngModel"
            />
            @if (email.invalid && email.touched) {
            <div class="text-danger small">Email is required</div>
            }
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              [(ngModel)]="loginData.password"
              required
              #password="ngModel"
            />
            @if (password.invalid && password.touched) {
            <div class="text-danger small">Password is required</div>
            }
          </div>

          @if (error) {
          <div class="alert alert-danger">
            {{ error }}
          </div>
          }

          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-success" [disabled]="loginForm.invalid || loading">
              @if (loading) {
              <span class="spinner-border spinner-border-sm me-2"></span>
              }

              <i class="bi bi-box-arrow-in-right"></i>
              {{ loading ? 'Logging in...' : 'Login' }}
            </button>

            <button type="button" class="btn btn-outline-secondary" (click)="goToProducts()">
              <i class="bi bi-arrow-left"></i> Back to Products
            </button>
          </div>
        </form>

        <div class="text-center mt-3">
          <small class="text-muted"> Demo: Use any email and password </small>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
  };

  loading = false;
  error: string | null = null;

  constructor(private router: Router) {}

  onLogin() {
    this.loading = true;
    this.error = null;

    // Simulate API call
    setTimeout(() => {
      if (this.loginData.email && this.loginData.password) {
        console.log('Login successful:', this.loginData);
        this.loading = false;
        this.router.navigate(['/products']);
      } else {
        this.error = 'Please fill in all fields';
        this.loading = false;
      }
    }, 1000);
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }
}
