import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SellerService } from '../../core/services/seller.service';

@Component({
  selector: 'app-seller-shell',
  templateUrl: './seller-shell.component.html',
  styleUrls: ['./seller-shell.component.css'],
  standalone: false
})
export class SellerShellComponent implements OnInit {
  userName = '';
  hasProfile = false;
  loading = true;

  constructor(
    private auth: AuthService,
    private seller: SellerService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userName = this.auth.getUserName();
    this.seller.myProfile().subscribe({
      next: (profile: any) => {
        this.hasProfile = !!(profile && profile.sellerId);
        this.loading = false;
        if (!this.hasProfile) {
          this.router.navigate(['/seller/register-seller']);
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.hasProfile = false;
        this.loading = false;
        this.router.navigate(['/seller/register-seller']);
        this.cdr.detectChanges();
      }
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}