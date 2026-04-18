import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],
  standalone: false
})
export class CustomerDashboardComponent implements OnInit {
  totalOrders = 0;
  cartItems = 0;
  unreadNotifications = 0;

  constructor(private customer: CustomerService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.customer.getMyOrders().subscribe({
      next: (orders) => { this.totalOrders = (orders || []).length; this.cdr.detectChanges(); },
      error: () => { this.totalOrders = 0; }
    });
    this.customer.getCart().subscribe({
      next: (cart: any) => {
        this.cartItems = (cart?.items || []).length;
        this.cdr.detectChanges();
      },
      error: () => { this.cartItems = 0; }
    });
    this.customer.getMyNotifications().subscribe({
      next: (notifications) => {
        this.unreadNotifications = (notifications || []).filter(n => n.status === 'Unread').length;
        this.cdr.detectChanges();
      },
      error: () => { this.unreadNotifications = 0; }
    });
  }
}