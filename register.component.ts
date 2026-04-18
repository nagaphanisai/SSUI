import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false
})
export class RegisterComponent {
  name = '';
  email = '';
  phone = '';
  password = '';
  role = 'Customer';
  roles = ['Customer', 'Seller', 'Logistics', 'Admin'];

  loading = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onRegister(): void {
    this.errorMsg = '';
    this.successMsg = '';

    if (!this.name || !this.email || !this.phone || !this.password) {
      this.errorMsg = 'All fields are required.';
      return;
    }

    this.loading = true;
    this.cdr.detectChanges();

    this.auth.register({
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password,
      role: this.role
    }).subscribe({
      next: () => {
        this.loading = false;
        this.successMsg = 'Registration successful! Redirecting to login...';
        this.cdr.detectChanges();
        setTimeout(() => this.router.navigate(['/auth/login']), 1500);
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err.error || 'Registration failed.';
        this.cdr.detectChanges();
      }
    });
  }
}