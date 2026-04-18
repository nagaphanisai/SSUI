import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import {
  Seller, Store, Product, Inventory, SellerOrderItem, Commission, ReturnRequest
} from '../models/models';

@Injectable({ providedIn: 'root' })
export class SellerService {

  constructor(private api: ApiService) {}

  myProfile(): Observable<Seller> {
    return this.api.get<Seller>('seller/my-profile');
  }

  registerSellerProfile(storeName: string): Observable<any> {
    return this.api.post<any>('seller', { storeName }, { responseType: 'text' });
  }

  getMyStores(): Observable<Store[]> {
    return this.api.get<Store[]>('sellerstore/my-stores');
  }

  createStore(categoryFocus: string): Observable<any> {
    return this.api.post<any>('sellerstore/create',
      { categoryFocus },
      { responseType: 'text' }
    );
  }

  updateStoreStatus(storeId: number, status: string): Observable<any> {
    return this.api.put<any>(`sellerstore/update-status/${storeId}`,
      { status },
      { responseType: 'text' }
    );
  }

  deleteStore(storeId: number): Observable<any> {
    return this.api.delete<any>(`sellerstore/delete/${storeId}`,
      { responseType: 'text' }
    );
  }

  getMyProducts(): Observable<Product[]> {
    return this.api.get<Product[]>('product/my-products');
  }

  createProduct(product: any): Observable<any> {
    return this.api.post<any>('product/create', product, { responseType: 'text' });
  }

  saveInventory(data: Inventory): Observable<any> {
    return this.api.post<any>('inventory', data, { responseType: 'text' });
  }

  getInventory(productId: number): Observable<Inventory> {
    return this.api.get<Inventory>(`inventory/${productId}`);
  }

  getSellerOrders(): Observable<SellerOrderItem[]> {
    return this.api.get<SellerOrderItem[]>('order/seller-orders');
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.api.put<any>(`order/${orderId}`, { status }, { responseType: 'text' });
  }

  getRevenue(): Observable<{ revenue: number }> {
    return this.api.get<{ revenue: number }>('analytics/seller-revenue');
  }

  getCommission(): Observable<Commission> {
    return this.api.get<Commission>('commission');
  }

  getSellerReturns(): Observable<ReturnRequest[]> {
    return this.api.get<ReturnRequest[]>('return/seller-returns');
  }
}