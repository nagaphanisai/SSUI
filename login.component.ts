import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  errorMsg = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onLogin(): void {
    this.errorMsg = '';
    if (!this.email || !this.password) {
      this.errorMsg = 'Please enter email and password.';
      return;
    }
    this.loading = true;
    this.cdr.detectChanges();

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.loading = false;
        if (res && res.token && res.role) {
          this.redirectByRole(res.role);
        } else {
          this.errorMsg = 'Invalid credentials.';
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err.error?.error || 'Login failed. Check your credentials.';
        this.cdr.detectChanges();
      }
    });
  }

  private redirectByRole(role: string): void {
    switch (role) {
      case 'Admin':     this.router.navigate(['/admin']); break;
      case 'Seller':    this.router.navigate(['/seller']); break;
      case 'Customer':  this.router.navigate(['/customer']); break;
      case 'Logistics': this.router.navigate(['/logistics']); break;
      default: this.router.navigate(['/auth']);
    }
  }
}