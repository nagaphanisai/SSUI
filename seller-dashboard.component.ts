import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SellerService } from '../../core/services/seller.service';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css'],
  standalone: false
})
export class SellerDashboardComponent implements OnInit {
  totalStores = 0;
  totalProducts = 0;
  totalOrders = 0;
  revenue = 0;
  commissionPct = 0;
  loading = true;

  constructor(private seller: SellerService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.seller.getMyStores().subscribe({
      next: (stores) => {
        this.totalStores = (stores || []).length;
        this.cdr.detectChanges();
      },
      error: () => { this.totalStores = 0; this.cdr.detectChanges(); }
    });

    this.seller.getMyProducts().subscribe({
      next: (products) => {
        this.totalProducts = (products || []).length;
        this.cdr.detectChanges();
      },
      error: () => { this.totalProducts = 0; this.cdr.detectChanges(); }
    });

    this.seller.getSellerOrders().subscribe({
      next: (orders) => {
        this.totalOrders = (orders || []).length;
        this.cdr.detectChanges();
      },
      error: () => { this.totalOrders = 0; this.cdr.detectChanges(); }
    });

    this.seller.getRevenue().subscribe({
      next: (res) => {
        this.revenue = res?.revenue || 0;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => { this.revenue = 0; this.loading = false; this.cdr.detectChanges(); }
    });

    this.seller.getCommission().subscribe({
      next: (c) => {
        this.commissionPct = c?.percentage || 0;
        this.cdr.detectChanges();
      },
      error: () => { this.commissionPct = 0; }
    });
  }
}