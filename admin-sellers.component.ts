import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { Seller } from '../../core/models/models';

@Component({
  selector: 'app-admin-sellers',
  templateUrl: './admin-sellers.component.html',
  styleUrls: ['./admin-sellers.component.css'],
  standalone: false
})
export class AdminSellersComponent implements OnInit {
  sellers: Seller[] = [];
  loading = true;
  errorMsg = '';
  successMsg = '';
  rejectingSellerId: number | null = null;
  rejectReason = '';

  constructor(private admin: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.admin.getAllSellers().subscribe({
      next: (data) => {
        this.sellers = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to load sellers';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  approve(sellerId: number): void {
    this.admin.approveSeller(sellerId).subscribe({
      next: () => {
        this.successMsg = 'Seller approved.';
        this.load();
        setTimeout(() => { this.successMsg = ''; this.cdr.detectChanges(); }, 2500);
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to approve';
        this.cdr.detectChanges();
      }
    });
  }

  openReject(sellerId: number): void {
    this.rejectingSellerId = sellerId;
    this.rejectReason = '';
  }

  closeReject(): void {
    this.rejectingSellerId = null;
    this.rejectReason = '';
  }

  submitReject(): void {
    if (!this.rejectingSellerId || !this.rejectReason.trim()) {
      this.errorMsg = 'Reason is required.';
      return;
    }
    this.admin.rejectSeller(this.rejectingSellerId, this.rejectReason.trim()).subscribe({
      next: () => {
        this.successMsg = 'Seller rejected.';
        this.closeReject();
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