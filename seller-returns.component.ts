import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SellerService } from '../../core/services/seller.service';
import { ReturnRequest } from '../../core/models/models';

@Component({
  selector: 'app-seller-returns',
  templateUrl: './seller-returns.component.html',
  styleUrls: ['./seller-returns.component.css'],
  standalone: false
})
export class SellerReturnsComponent implements OnInit {
  returns: ReturnRequest[] = [];
  loading = true;
  errorMsg = '';

  constructor(private seller: SellerService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadReturns();
  }

  loadReturns(): void {
    this.seller.getSellerReturns().subscribe({
      next: (data) => {
        this.returns = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to load return requests';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getStatusClass(status: string): string {
    return (status || '').toLowerCase();
  }
}