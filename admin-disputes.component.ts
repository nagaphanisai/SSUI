import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { Dispute } from '../../core/models/models';

@Component({
  selector: 'app-admin-disputes',
  templateUrl: './admin-disputes.component.html',
  styleUrls: ['./admin-disputes.component.css'],
  standalone: false
})
export class AdminDisputesComponent implements OnInit {
  disputes: Dispute[] = [];
  loading = true;
  errorMsg = '';
  successMsg = '';

  resolvingId: number | null = null;
  resolutionNote = '';

  constructor(private admin: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.admin.getAllDisputes().subscribe({
      next: (data) => {
        this.disputes = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to load disputes';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  openResolve(id: number): void {
    this.resolvingId = id;
    this.resolutionNote = '';
  }

  closeResolve(): void {
    this.resolvingId = null;
    this.resolutionNote = '';
  }

  submit(): void {
    if (!this.resolvingId || !this.resolutionNote.trim()) {
      this.errorMsg = 'Resolution note is required.';
      return;
    }
    this.admin.resolveDispute(this.resolvingId, this.resolutionNote.trim()).subscribe({
      next: () => {
        this.successMsg = 'Dispute resolved.';
        this.closeResolve();
        this.load();
        setTimeout(() => { this.successMsg = ''; this.cdr.detectChanges(); }, 2500);
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to resolve';
        this.cdr.detectChanges();
      }
    });
  }

  getStatusClass(status: string): string {
    return (status || '').toLowerCase();
  }
}