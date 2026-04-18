import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from '../../core/services/seller.service';

@Component({
  selector: 'app-seller-register',
  templateUrl: './seller-register.component.html',
  styleUrls: ['./seller-register.component.css'],
  standalone: false
})
export class SellerRegisterComponent {
  storeName = '';
  loading = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private seller: SellerService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onSubmit(): void {
    this.errorMsg = '';
    this.successMsg = '';

    if (!this.storeName.trim()) {
      this.errorMsg = 'Please enter your business name.';
      return;
    }

    this.loading = true;
    this.cdr.detectChanges();

    this.seller.registerSellerProfile(this.storeName.trim()).subscribe({
      next: () => {
        this.loading = false;
        this.successMsg = 'Seller profile created. You can now add stores.';
        this.cdr.detectChanges();
        setTimeout(() => this.router.navigate(['/seller/stores']), 1500);
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err.error || 'Failed to create seller profile.';
        this.cdr.detectChanges();
      }
    });
  }
}