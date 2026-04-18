import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SellerService } from '../../core/services/seller.service';
import { Store } from '../../core/models/models';

@Component({
  selector: 'app-seller-stores',
  templateUrl: './seller-stores.component.html',
  styleUrls: ['./seller-stores.component.css'],
  standalone: false
})
export class SellerStoresComponent implements OnInit {
  stores: Store[] = [];
  loading = true;
  showForm = false;
  newCategoryFocus = '';
  errorMsg = '';
  successMsg = '';
  saving = false;

  constructor(private seller: SellerService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.seller.getMyStores().subscribe({
      next: (data) => {
        this.stores = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to load stores';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.newCategoryFocus = '';
    this.errorMsg = '';
    this.successMsg = '';
  }

  createStore(): void {
    if (!this.newCategoryFocus.trim()) {
      this.errorMsg = 'Please enter a category focus for the store.';
      return;
    }
    this.saving = true;
    this.cdr.detectChanges();

    this.seller.createStore(this.newCategoryFocus.trim()).subscribe({
      next: () => {
        this.saving = false;
        this.showForm = false;
        this.successMsg = 'Store submitted for admin approval.';
        this.newCategoryFocus = '';
        this.loadStores();
        this.cdr.detectChanges();
        setTimeout(() => { this.successMsg = ''; this.cdr.detectChanges(); }, 3000);
      },
      error: (err) => {
        this.saving = false;
        this.errorMsg = err.error || 'Failed to create store';
        this.cdr.detectChanges();
      }
    });
  }

  toggleStatus(store: Store): void {
    const newStatus = store.status === 'Active' ? 'Inactive' : 'Active';
    this.seller.updateStoreStatus(store.storeId, newStatus).subscribe({
      next: () => {
        this.loadStores();
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to update store status';
        this.cdr.detectChanges();
      }
    });
  }

  deleteStore(store: Store): void {
    if (!confirm(`Delete store "${store.categoryFocus}"?`)) return;
    this.seller.deleteStore(store.storeId).subscribe({
      next: () => {
        this.successMsg = 'Store deleted successfully.';
        this.loadStores();
        this.cdr.detectChanges();
        setTimeout(() => { this.successMsg = ''; this.cdr.detectChanges(); }, 3000);
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to delete store';
        this.cdr.detectChanges();
      }
    });
  }

  getStatusClass(status: string): string {
    return (status || '').toLowerCase();
  }
}