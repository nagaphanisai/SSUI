import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';

@Component({
  selector: 'app-admin-commission',
  templateUrl: './admin-commission.component.html',
  styleUrls: ['./admin-commission.component.css'],
  standalone: false
})
export class AdminCommissionComponent implements OnInit {
  currentPct: number | null = null;
  newPct: number | null = null;

  loading = true;
  saving = false;
  errorMsg = '';
  successMsg = '';

  constructor(private admin: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.admin.getCommission().subscribe({
      next: (c) => {
        this.currentPct = c?.percentage ?? 0;
        this.newPct = this.currentPct;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.currentPct = 0;
        this.newPct = 0;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  save(): void {
    if (this.newPct === null || this.newPct < 0 || this.newPct > 100) {
      this.errorMsg = 'Enter a valid percentage between 0 and 100.';
      return;
    }
    this.saving = true;
    this.cdr.detectChanges();
    this.admin.setCommission(this.newPct).subscribe({
      next: () => {
        this.saving = false;
        this.successMsg = 'Commission updated.';
        this.load();
        setTimeout(() => { this.successMsg = ''; this.cdr.detectChanges(); }, 2500);
      },
      error: (err) => {
        this.saving = false;
        this.errorMsg = err.error || 'Failed to save commission';
        this.cdr.detectChanges();
      }
    });
  }
}