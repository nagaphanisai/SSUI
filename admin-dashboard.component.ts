import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: false
})
export class AdminDashboardComponent implements OnInit {
  totalOrders = 0;
  totalRevenue = 0;
  totalRefund = 0;
  totalProducts = 0;

  constructor(private admin: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.admin.getPlatformAnalytics().subscribe({
      next: (res: any) => {
        this.totalOrders = res?.totalOrders || 0;
        this.totalRevenue = res?.totalRevenue || 0;
        this.totalRefund = res?.totalRefundAmount || 0;
        this.totalProducts = res?.totalProducts || 0;
        this.cdr.detectChanges();
      },
      error: () => { this.cdr.detectChanges(); }
    });
  }
}