import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';
import { Notification } from '../../core/models/models';

@Component({
  selector: 'app-customer-notifications',
  templateUrl: './customer-notifications.component.html',
  styleUrls: ['./customer-notifications.component.css'],
  standalone: false
})
export class CustomerNotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  loading = true;
  errorMsg = '';

  constructor(private customer: CustomerService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.customer.getMyNotifications().subscribe({
      next: (data) => {
        this.notifications = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to load notifications';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  markAsRead(n: Notification): void {
    if (n.status === 'Read') return;
    this.customer.markNotificationRead(n.notificationID).subscribe({
      next: () => {
        n.status = 'Read';
        this.cdr.detectChanges();
      }
    });
  }

  getStatusClass(status: string): string {
    return (status || '').toLowerCase();
  }

  iconForCategory(category: string): string {
    switch ((category || '').toLowerCase()) {
      case 'order':    return 'bi-receipt';
      case 'shipment': return 'bi-truck';
      case 'payment':  return 'bi-credit-card';
      case 'return':   return 'bi-arrow-return-left';
      default:         return 'bi-bell';
    }
  }
}