import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SellerService } from '../../core/services/seller.service';
import { AuthService } from '../../core/services/auth.service';
import { Seller } from '../../core/models/models';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css'],
  standalone: false
})
export class SellerProfileComponent implements OnInit {
  profile: Seller | null = null;
  userName = '';
  loading = true;
  errorMsg = '';

  constructor(
    private seller: SellerService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userName = this.auth.getUserName();
    this.seller.myProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to load profile';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getStatusClass(status: string): string {
    return (status || '').toLowerCase();
  }
}