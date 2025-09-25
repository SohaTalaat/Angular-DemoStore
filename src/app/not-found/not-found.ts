import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [CommonModule],
  standalone: true,
  template: `
    <div class="card text-center">
      <div class="card-header bg-danger text-white">
        <h3 class="card-title mb-0"><i class="bi bi-exclamation-triangle"></i> Page Not Found</h3>
      </div>

      <div class="card-body py-5">
        <div class="display-1 text-muted mb-4">404</div>
        <h2 class="mb-3">Oops! Page Not Found</h2>
        <p class="text-muted mb-4">
          The page you are looking for might have been removed, had its name changed, or is
          temporarily unavailable.
        </p>

        <div class="d-flex justify-content-center gap-2">
          <button class="btn btn-primary" (click)="goHome()">
            <i class="bi bi-house"></i> Go to Products
          </button>
          <button class="btn btn-outline-secondary" (click)="goBack()">
            <i class="bi bi-arrow-left"></i> Go Back
          </button>
        </div>
      </div>
    </div>
  `,
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/products']);
  }

  goBack() {
    window.history.back();
  }
}
