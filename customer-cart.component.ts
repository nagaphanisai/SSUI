import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../core/services/customer.service';
import { Cart } from '../../core/models/models';

@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css'],
  standalone: false
})
export class CustomerCartComponent implements OnInit {
  cart: Cart | null = null;
  loading = true;
  errorMsg = '';
  successMsg = '';
  processing = false;

  constructor(
    private customer: CustomerService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.customer.getCart().subscribe({
      next: (data: any) => {
        this.cart = data && data.items ? data : { orderId: 0, items: [] };
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to load cart';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  removeItem(productId: number): void {
    this.customer.removeFromCart(productId).subscribe({
      next: () => {
        this.successMsg = 'Item removed from cart.';
        this.loadCart();
        setTimeout(() => { this.successMsg = ''; this.cdr.detectChanges(); }, 2500);
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to remove item';
        this.cdr.detectChanges();
      }
    });
  }

  getTotal(): number {
    if (!this.cart || !this.cart.items) return 0;
    return this.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  checkout(): void {
    this.errorMsg = '';
    this.successMsg = '';
    this.processing = true;
    this.cdr.detectChanges();

    this.customer.checkout().subscribe({
      next: () => {
        this.processing = false;
        this.successMsg = 'Order placed! Redirecting to payment...';
        this.cdr.detectChanges();
        setTimeout(() => this.router.navigate(['/customer/payment']), 1500);
      },
      error: (err) => {
        this.processing = false;
        this.errorMsg = err.error || 'Checkout failed';
        this.cdr.detectChanges();
      }
    });
  }
}