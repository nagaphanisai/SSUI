import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string[] = route.data?.['roles'] || [];
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || !role) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    if (expectedRoles.length === 0 || expectedRoles.includes(role)) {
      return true;
    }

    this.router.navigate(['/auth/login']);
    return false;
  }
}