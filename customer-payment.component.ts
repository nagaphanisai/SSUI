import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../core/services/customer.service';
import { Order } from '../../core/models/models';

@Component({
  selector: 'app-customer-payment',
  templateUrl: './customer-payment.component.html',
  styleUrls: ['./customer-payment.component.css'],
  standalone: false
})
export class CustomerPaymentComponent implements OnInit {
  pendingOrders: Order[] = [];
  selectedOrderId: number | null = null;
  selectedOrderAmount: number = 0;
  method: string = 'UPI';
  methods = ['UPI', 'Card', 'NetBanking', 'Wallet'];

  loading = true;
  processing = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private customer: CustomerService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.customer.getMyOrders().subscribe({
      next: (orders) => {
        this.pendingOrders = (orders || []).filter(o =>
          (o.status || '').toLowerCase() === 'placed'
        );
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onOrderSelect(): void {
    const selected = this.pendingOrders.find(o => o.orderID === this.selectedOrderId);
    this.selectedOrderAmount = selected ? selected.totalAmount : 0;
    this.cdr.detectChanges();
  }

  pay(): void {
    this.errorMsg = '';
    this.successMsg = '';
    if (!this.selectedOrderId || this.selectedOrderAmount <= 0) {
      this.errorMsg = 'Please select an order to pay for.';
      return;
    }
    this.processing = true;
    this.cdr.detectChanges();

    this.customer.createPayment(this.selectedOrderId, this.selectedOrderAmount, this.method).subscribe({
      next: () => {
        this.processing = false;
        this.successMsg = 'Payment successful. Redirecting to orders...';
        this.cdr.detectChanges();
        setTimeout(() => this.router.navigate(['/customer/orders']), 1500);
      },
      error: (err) => {
        this.processing = false;
        this.errorMsg = err.error || 'Payment failed';
        this.cdr.detectChanges();
      }
    });
  }
}