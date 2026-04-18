import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';

@Component({
  selector: 'app-admin-stores',
  templateUrl: './admin-stores.component.html',
  styleUrls: ['./admin-stores.component.css'],
  standalone: false
})
export class AdminStoresComponent implements OnInit {
  stores: any[] = [];
  loading = true;
  errorMsg = '';
  successMsg = '';

  constructor(private admin: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.admin.getAllStores().subscribe({
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

  approve(storeId: number): void {
    this.admin.approveStore(storeId).subscribe({
      next: () => {
        this.successMsg = 'Store approved.';
        this.load();
        setTimeout(() => { this.successMsg = ''; this.cdr.detectChanges(); }, 2500);
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to approve store';
        this.cdr.detectChanges();
      }
    });
  }

  reject(storeId: number): void {
    if (!confirm('Reject this store?')) return;
    this.admin.rejectStore(storeId).subscribe({
      next: () => {
        this.successMsg = 'Store rejected.';
        this.load();
        setTimeout(() => { this.successMsg = ''; this.cdr.detectChanges(); }, 2500);
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to reject';
        this.cdr.detectChanges();
      }
    });
  }

  getStatusClass(status: string): string {
    return (status || '').toLowerCase();
  }
}