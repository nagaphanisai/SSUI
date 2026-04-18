import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { User } from '../../core/models/models';

@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.css'],
  standalone: false
})
export class AdminCustomersComponent implements OnInit {
  customers: User[] = [];
  loading = true;
  errorMsg = '';

  constructor(private admin: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.admin.getAllCustomers().subscribe({
      next: (data) => {
        this.customers = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to load customers';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}