import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { Policy } from '../../core/models/models';

@Component({
  selector: 'app-admin-policies',
  templateUrl: './admin-policies.component.html',
  styleUrls: ['./admin-policies.component.css'],
  standalone: false
})
export class AdminPoliciesComponent implements OnInit {
  policies: Policy[] = [];
  loading = true;

  title = '';
  content = '';

  editingId: number | null = null;

  saving = false;
  errorMsg = '';
  successMsg = '';

  constructor(private admin: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.admin.getAllPolicies().subscribe({
      next: (data) => {
        this.policies = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to load policies';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  save(): void {
    if (!this.title.trim() || !this.content.trim()) {
      this.errorMsg = 'Title and content are required.';
      return;
    }
    this.saving = true;
    this.cdr.detectChanges();

    const obs = this.editingId
      ? this.admin.updatePolicy(this.editingId, this.title, this.content)
      : this.admin.createPolicy(this.title, this.content);

    obs.subscribe({
      next: () => {
        this.saving = false;
        this.successMsg = this.editingId ? 'Policy updated.' : 'Policy created.';
        this.resetForm();
        this.load();
        setTimeout(() => { this.successMsg = ''; this.cdr.detectChanges(); }, 2500);
      },
      error: (err) => {
        this.saving = false;
        this.errorMsg = err.error || 'Failed to save policy';
        this.cdr.detectChanges();
      }
    });
  }

  edit(p: Policy): void {
    this.editingId = p.policyID;
    this.title = p.title;
    this.content = p.content;
  }

  delete(p: Policy): void {
    if (!confirm(`Delete policy "${p.title}"?`)) return;
    this.admin.deletePolicy(p.policyID).subscribe({
      next: () => {
        this.successMsg = 'Policy deleted.';
        this.load();
        setTimeout(() => { this.successMsg = ''; this.cdr.detectChanges(); }, 2500);
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to delete';
        this.cdr.detectChanges();
      }
    });
  }

  resetForm(): void {
    this.editingId = null;
    this.title = '';
    this.content = '';
  }
}