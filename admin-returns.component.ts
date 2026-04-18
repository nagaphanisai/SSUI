import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { ReturnRequest } from '../../core/models/models';

@Component({
  selector: 'app-admin-returns',
  templateUrl: './admin-returns.component.html',
  styleUrls: ['./admin-returns.component.css'],
  standalone: false
})
export class AdminReturnsComponent implements OnInit {
  returns: ReturnRequest[] = [];
  loading = true;
  errorMsg = '';
  successMsg = '';

  constructor(private admin: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.admin.getAllReturns().subscribe({
      next: (data) => {
        this.returns = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to load returns';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  process(returnId: number, approve: boolean): void {
    this.admin.processReturn(returnId, approve).subscribe({
      next: () => {
        this.successMsg = approve ? 'Return approved and refund processed.' : 'Return rejected.';
        this.load();
        setTimeout(() => { this.successMsg = ''; this.cdr.detectChanges(); }, 2500);
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to process return';
        this.cdr.detectChanges();
      }
    });
  }

  getStatusClass(status: string): string {
    return (status || '').toLowerCase();
  }
}