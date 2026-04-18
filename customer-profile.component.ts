import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css'],
  standalone: false
})
export class CustomerProfileComponent {
  userName = '';
  userId = 0;

  constructor(private auth: AuthService) {
    this.userName = this.auth.getUserName();
    this.userId = this.auth.getUserId();
  }
}