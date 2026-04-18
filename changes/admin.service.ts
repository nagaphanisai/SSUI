import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import {
  Seller, Category, Policy, Commission, Dispute, Order, ReturnRequest, Product, User
} from '../models/models';

@Injectable({ providedIn: 'root' })
export class AdminService {

  constructor(private api: ApiService) {}

  getAllSellers(): Observable<Seller[]> {
    return this.api.get<Seller[]>('seller');
  }

  approveSeller(sellerId: number): Observable<any> {
    return this.api.put<any>(`seller/approve/${sellerId}`, {}, { responseType: 'text' });
  }

  rejectSeller(sellerId: number, reason: string): Observable<any> {
    return this.api.put<any>(`seller/reject/${sellerId}`, { reason }, { responseType: 'text' });
  }

  getAllStores(): Observable<any[]> {
    return this.api.get<any[]>('sellerstore/all');
  }

  approveStore(storeId: number): Observable<any> {
    return this.api.put<any>(`sellerstore/approve/${storeId}`, {}, { responseType: 'text' });
  }

  rejectStore(storeId: number): Observable<any> {
    return this.api.put<any>(`sellerstore/reject/${storeId}`, {}, { responseType: 'text' });
  }

  getAllCustomers(): Observable<User[]> {
    return this.api.get<User[]>('admin/customers');
  }

  getAllLogisticsUsers(): Observable<User[]> {
    return this.api.get<User[]>('admin/logistics');
  }

  getAllProducts(): Observable<Product[]> {
    return this.api.get<Product[]>('product/all');
  }

  getAllCategories(): Observable<Category[]> {
    return this.api.get<Category[]>('category');
  }

  createCategory(name: string, parentCategoryID: number | null): Observable<any> {
    return this.api.post<any>('category',
      { name, parentCategoryID },
      { responseType: 'text' }
    );
  }

  getCommission(): Observable<Commission> {
    return this.api.get<Commission>('commission');
  }

  setCommission(percentage: number): Observable<any> {
    return this.api.post<any>('commission', { percentage });
  }

  getAllPolicies(): Observable<Policy[]> {
    return this.api.get<Policy[]>('policy');
  }

  createPolicy(title: string, content: string): Observable<any> {
    return this.api.post<any>('policy', { title, content });
  }

  updatePolicy(id: number, title: string, content: string): Observable<any> {
    return this.api.put<any>(`policy/${id}`, { title, content });
  }

  deletePolicy(id: number): Observable<any> {
    return this.api.delete<any>(`policy/${id}`);
  }

  getAllDisputes(): Observable<Dispute[]> {
    return this.api.get<Dispute[]>('dispute');
  }

  resolveDispute(disputeId: number, resolutionNote: string): Observable<any> {
    return this.api.put<any>(`dispute/resolve/${disputeId}`, { resolutionNote },
      { responseType: 'text' });
  }

  getAllReturns(): Observable<ReturnRequest[]> {
    return this.api.get<ReturnRequest[]>('return/all');
  }

  processReturn(returnId: number, approve: boolean): Observable<any> {
    return this.api.put<any>(`return/${returnId}`, { approve }, { responseType: 'text' });
  }

  getAllOrders(): Observable<Order[]> {
    return this.api.get<Order[]>('order/all');
  }

  getPlatformAnalytics(): Observable<any> {
    return this.api.get<any>('analytics/platform');
  }
}