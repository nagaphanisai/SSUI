import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';
import { Policy } from '../../core/models/models';

@Component({
  selector: 'app-customer-policies',
  templateUrl: './customer-policies.component.html',
  styleUrls: ['./customer-policies.component.css'],
  standalone: false
})
export class CustomerPoliciesComponent implements OnInit {
  policies: Policy[] = [];
  loading = true;
  errorMsg = '';

  constructor(private customer: CustomerService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.customer.getAllPolicies().subscribe({
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
}