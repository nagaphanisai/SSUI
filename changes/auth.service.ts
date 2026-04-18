import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { LoginRequest, LoginResponse, RegisterRequest } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private api: ApiService) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.api.post<LoginResponse>('auth/login', data).pipe(
      tap(res => {
        if (res && res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);
          localStorage.setItem('userId', String(res.userId));
          localStorage.setItem('name', res.name || '');
        }
      })
    );
  }

  register(data: RegisterRequest): Observable<any> {
    return this.api.post<any>('auth/register', data, { responseType: 'text' });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  getUserName(): string {
    return localStorage.getItem('name') || '';
  }

  getUserId(): number {
    const id = localStorage.getItem('userId');
    return id ? Number(id) : 0;
  }
}