import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SellerService } from '../../core/services/seller.service';
import { AdminService } from '../../core/services/admin.service';
import { Product, Category, Store } from '../../core/models/models';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.css'],
  standalone: false
})
export class SellerProductsComponent implements OnInit {
  products: Product[] = [];
  stores: Store[] = [];
  categories: Category[] = [];

  loading = true;
  showForm = false;
  saving = false;
  errorMsg = '';
  successMsg = '';

  // Form fields
  name = '';
  price: number | null = null;
  sku = '';
  categoryId: number | null = null;
  storeId: number | null = null;

  constructor(
    private seller: SellerService,
    private admin: AdminService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.seller.getMyProducts().subscribe({
      next: (data) => {
        this.products = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to load products';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
    this.seller.getMyStores().subscribe({
      next: (data) => {
        this.stores = (data || []).filter(s => s.status === 'Active');
        this.cdr.detectChanges();
      }
    });
    this.admin.getAllCategories().subscribe({
      next: (data) => {
        this.categories = this.flattenCategories(data || []);
        this.cdr.detectChanges();
      }
    });
  }

  private flattenCategories(list: Category[]): Category[] {
    const out: Category[] = [];
    for (const c of list) {
      out.push(c);
      if (c.subCategories && c.subCategories.length > 0) {
        out.push(...this.flattenCategories(c.subCategories));
      }
    }
    return out;
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.errorMsg = '';
    this.successMsg = '';
    this.name = '';
    this.price = null;
    this.sku = '';
    this.categoryId = null;
    this.storeId = null;
  }

  createProduct(): void {
    this.errorMsg = '';
    this.successMsg = '';
    if (!this.name || !this.price || !this.sku || !this.categoryId || !this.storeId) {
      this.errorMsg = 'All fields including store and category are required.';
      return;
    }
    this.saving = true;
    this.cdr.detectChanges();

    this.seller.createProduct({
      name: this.name,
      price: this.price,
      sku: this.sku,
      categoryId: this.categoryId,
      storeId: this.storeId
    }).subscribe({
      next: () => {
        this.saving = false;
        this.successMsg = 'Product added successfully.';
        this.showForm = false;
        this.loadAll();
        this.cdr.detectChanges();
        setTimeout(() => { this.successMsg = ''; this.cdr.detectChanges(); }, 3000);
      },
      error: (err) => {
        this.saving = false;
        this.errorMsg = err.error || 'Failed to add product';
        this.cdr.detectChanges();
      }
    });
  }
}