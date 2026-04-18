import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';
import { Order } from '../../core/models/models';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css'],
  standalone: false
})
export class CustomerOrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  errorMsg = '';
  successMsg = '';

  // Return and dispute forms
  showReturnForm: number | null = null;
  showDisputeForm: number | null = null;
  showRatingForm: number | null = null;
  returnReason = '';
  disputeReason = '';
  ratingValue = 5;

  constructor(
    private customer: CustomerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.customer.getMyOrders().subscribe({
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

  isDelivered(status: string): boolean {
    return (status || '').toLowerCase() === 'delivered';
  }

  getStatusClass(status: string): string {
    return (status || '').toLowerCase();
  }

  openReturnForm(orderId: number): void {
    this.showReturnForm = orderId;
    this.showDisputeForm = null;
    this.showRatingForm = null;
    this.returnReason = '';
  }

  openDisputeForm(orderId: number): void {
    this.showDisputeForm = orderId;
    this.showReturnForm = null;
    this.showRatingForm = null;
    this.disputeReason = '';
  }

  openRatingForm(orderId: number): void {
    this.showRatingForm = orderId;
    this.showReturnForm = null;
    this.showDisputeForm = null;
    this.ratingValue = 5;
  }

  closeForms(): void {
    this.showReturnForm = null;
    this.showDisputeForm = null;
    this.showRatingForm = null;
  }

  submitReturn(orderId: number): void {
    if (!this.returnReason.trim()) {
      this.errorMsg = 'Please provide a reason.';
      return;
    }
    this.customer.createReturn(orderId, this.returnReason.trim()).subscribe({
      next: () => {
        this.successMsg = 'Return request submitted.';
        this.closeForms();
        this.loadOrders();
        setTimeout(() => { this.successMsg = ''; this.cdr.detectChanges(); }, 2500);
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to submit return';
        this.cdr.detectChanges();
      }
    });
  }

  submitDispute(orderId: number): void {
    if (!this.disputeReason.trim()) {
      this.errorMsg = 'Please provide a reason.';
      return;
    }
    this.customer.raiseDispute(orderId, this.disputeReason.trim()).subscribe({
      next: () => {
        this.successMsg = 'Dispute raised successfully.';
        this.closeForms();
        setTimeout(() => { this.successMsg = ''; this.cdr.detectChanges(); }, 2500);
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to raise dispute';
        this.cdr.detectChanges();
      }
    });
  }

  submitRating(orderId: number): void {
    this.customer.getOrderDetails(orderId).subscribe({
      next: (details: any) => {
        const storeId = details?.storeId || details?.StoreID;
        if (!storeId) {
          this.errorMsg = 'Could not identify store for this order.';
          this.cdr.detectChanges();
          return;
        }
        this.customer.rateStore(storeId, this.ratingValue).subscribe({
          next: () => {
            this.successMsg = 'Thanks for rating!';
            this.closeForms();
            setTimeout(() => { this.successMsg = ''; this.cdr.detectChanges(); }, 2500);
          },
          error: (err) => {
            this.errorMsg = err.error || 'Failed to submit rating';
            this.cdr.detectChanges();
          }
        });
      },
      error: () => {
        this.errorMsg = 'Could not fetch order details.';
        this.cdr.detectChanges();
      }
    });
  }
}