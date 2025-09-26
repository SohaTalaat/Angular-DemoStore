import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [CommonModule],
  standalone: true,
  templateUrl: 'not-found.html',
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
