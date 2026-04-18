import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-logistics-shell',
  templateUrl: './logistics-shell.component.html',
  styleUrls: ['./logistics-shell.component.css'],
  standalone: false
})
export class LogisticsShellComponent {
  userName = '';

  constructor(private auth: AuthService, private router: Router) {
    this.userName = this.auth.getUserName();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}