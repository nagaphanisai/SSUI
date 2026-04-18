import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  get<T>(url: string, options: any = {}): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${url}`, options);
  }

  post<T>(url: string, body: any, options: any = {}): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${url}`, body, options);
  }

  put<T>(url: string, body: any, options: any = {}): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${url}`, body, options);
  }

  delete<T>(url: string, options: any = {}): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${url}`, options);
  }
}