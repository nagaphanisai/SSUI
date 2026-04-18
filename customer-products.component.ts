import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';
import { Product, Category } from '../../core/models/models';

@Component({
  selector: 'app-customer-products',
  templateUrl: './customer-products.component.html',
  styleUrls: ['./customer-products.component.css'],
  standalone: false
})
export class CustomerProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  selectedCategoryId: number | null = null;
  loading = true;
  errorMsg = '';
  successMsg = '';

  addingProductId: number | null = null;

  constructor(
    private customer: CustomerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.customer.getAllCategories().subscribe({
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

  loadProducts(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.customer.getAllProducts().subscribe({
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
  }

  filterByCategory(): void {
    if (!this.selectedCategoryId) {
      this.loadProducts();
      return;
    }
    this.loading = true;
    this.cdr.detectChanges();
    this.customer.getProductsByCategory(this.selectedCategoryId).subscribe({
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
  }

  addToCart(product: Product): void {
    this.errorMsg = '';
    this.successMsg = '';
    this.addingProductId = product.productID;
    this.cdr.detectChanges();

    this.customer.addToCart(product.productID, 1).subscribe({
      next: () => {
        this.addingProductId = null;
        this.successMsg = `${product.name} added to cart.`;
        this.cdr.detectChanges();
        setTimeout(() => { this.successMsg = ''; this.cdr.detectChanges(); }, 2500);
      },
      error: (err) => {
        this.addingProductId = null;
        this.errorMsg = err.error || 'Failed to add to cart';
        this.cdr.detectChanges();
      }
    });
  }
}