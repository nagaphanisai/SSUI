import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SellerService } from '../../core/services/seller.service';
import { SellerOrderItem } from '../../core/models/models';

@Component({
  selector: 'app-seller-orders',
  templateUrl: './seller-orders.component.html',
  styleUrls: ['./seller-orders.component.css'],
  standalone: false
})
export class SellerOrdersComponent implements OnInit {
  orders: SellerOrderItem[] = [];
  loading = true;
  errorMsg = '';
  successMsg = '';

  constructor(
    private seller: SellerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.seller.getSellerOrders().subscribe({
      next: (data) => {
        this.orders = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to load orders';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Seller can move Paid -> Packed, and Shipped -> Delivered
  canMarkPacked(status: string): boolean {
    return (status || '').toLowerCase() === 'paid';
  }

  canMarkDelivered(status: string): boolean {
    return (status || '').toLowerCase() === 'shipped';
  }

  markPacked(order: SellerOrderItem): void {
    this.updateStatus(order.orderID, 'Packed');
  }

  markDelivered(order: SellerOrderItem): void {
    this.updateStatus(order.orderID, 'Delivered');
  }

  private updateStatus(orderId: number, newStatus: string): void {
    this.errorMsg = '';
    this.successMsg = '';
    this.seller.updateOrderStatus(orderId, newStatus).subscribe({
      next: () => {
        this.successMsg = `Order #${orderId} marked as ${newStatus}.`;
        this.loadOrders();
        this.cdr.detectChanges();
        setTimeout(() => { this.successMsg = ''; this.cdr.detectChanges(); }, 3000);
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to update order status';
        this.cdr.detectChanges();
      }
    });
  }

  getStatusClass(status: string): string {
    return (status || '').toLowerCase();
  }
}