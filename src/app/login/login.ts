import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: 'login.html',
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
