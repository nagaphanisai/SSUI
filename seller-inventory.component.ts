import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SellerService } from '../../core/services/seller.service';
import { Product } from '../../core/models/models';

@Component({
  selector: 'app-seller-inventory',
  templateUrl: './seller-inventory.component.html',
  styleUrls: ['./seller-inventory.component.css'],
  standalone: false
})
export class SellerInventoryComponent implements OnInit {
  products: Product[] = [];
  selectedProductId: number | null = null;
  availableQuantity: number | null = null;
  reorderThreshold: number | null = null;

  loading = true;
  saving = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private seller: SellerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.seller.getMyProducts().subscribe({
      next: (data) => {
        this.products = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onProductChange(): void {
    this.errorMsg = '';
    this.successMsg = '';
    if (!this.selectedProductId) {
      this.availableQuantity = null;
      this.reorderThreshold = null;
      return;
    }
    this.seller.getInventory(this.selectedProductId).subscribe({
      next: (inv) => {
        if (inv) {
          this.availableQuantity = inv.availableQuantity;
          this.reorderThreshold = inv.reorderThreshold;
        } else {
          this.availableQuantity = 0;
          this.reorderThreshold = 0;
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.availableQuantity = 0;
        this.reorderThreshold = 0;
        this.cdr.detectChanges();
      }
    });
  }

  saveInventory(): void {
    this.errorMsg = '';
    this.successMsg = '';
    if (!this.selectedProductId ||
        this.availableQuantity === null || this.reorderThreshold === null) {
      this.errorMsg = 'Please select a product and enter all fields.';
      return;
    }
    this.saving = true;
    this.cdr.detectChanges();

    this.seller.saveInventory({
      productID: this.selectedProductId,
      availableQuantity: this.availableQuantity,
      reorderThreshold: this.reorderThreshold
    }).subscribe({
      next: () => {
        this.saving = false;
        this.successMsg = 'Inventory updated successfully.';
        this.cdr.detectChanges();
        setTimeout(() => { this.successMsg = ''; this.cdr.detectChanges(); }, 3000);
      },
      error: (err) => {
        this.saving = false;
        this.errorMsg = err.error || 'Failed to update inventory';
        this.cdr.detectChanges();
      }
    });
  }
}