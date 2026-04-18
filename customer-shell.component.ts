import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-customer-shell',
  templateUrl: './customer-shell.component.html',
  styleUrls: ['./customer-shell.component.css'],
  standalone: false
})
export class CustomerShellComponent {
  userName = '';

  constructor(private auth: AuthService, private router: Router) {
    this.userName = this.auth.getUserName();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}