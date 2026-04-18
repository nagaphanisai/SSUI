import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { User } from '../../core/models/models';

@Component({
  selector: 'app-admin-logistics-users',
  templateUrl: './admin-logistics-users.component.html',
  styleUrls: ['./admin-logistics-users.component.css'],
  standalone: false
})
export class AdminLogisticsUsersComponent implements OnInit {
  users: User[] = [];
  loading = true;
  errorMsg = '';

  constructor(private admin: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.admin.getAllLogisticsUsers().subscribe({
      next: (data) => {
        this.users = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to load logistics users';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}