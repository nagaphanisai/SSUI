import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import {
  Product, Category, Cart, Order, Notification, Policy
} from '../models/models';

@Injectable({ providedIn: 'root' })
export class CustomerService {

  constructor(private api: ApiService) {}

  getAllProducts(): Observable<Product[]> {
    return this.api.get<Product[]>('product/all');
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.api.get<Product[]>(`product?categoryId=${categoryId}`);
  }

  getAllCategories(): Observable<Category[]> {
    return this.api.get<Category[]>('category');
  }

  getCart(): Observable<Cart> {
    return this.api.get<Cart>('order/cart');
  }

  addToCart(productId: number, quantity: number): Observable<any> {
    return this.api.post<any>('order/cart/add',
      { productId, quantity },
      { responseType: 'text' }
    );
  }

  removeFromCart(productId: number): Observable<any> {
    return this.api.delete<any>(`order/cart/remove/${productId}`, { responseType: 'text' });
  }

  checkout(): Observable<any> {
    return this.api.post<any>('order/cart/checkout', {}, { responseType: 'text' });
  }

  getMyOrders(): Observable<Order[]> {
    return this.api.get<Order[]>('order/my-orders');
  }

  getOrderDetails(orderId: number): Observable<any> {
    return this.api.get<any>(`order/${orderId}`);
  }

  createPayment(orderId: number, amount: number, method: string): Observable<any> {
    return this.api.post<any>('payment',
      { orderID: orderId, amount, method },
      { responseType: 'text' }
    );
  }

  createReturn(orderId: number, reason: string): Observable<any> {
    return this.api.post<any>('return',
      { orderID: orderId, reason },
      { responseType: 'text' }
    );
  }

  raiseDispute(orderId: number, reason: string): Observable<any> {
    return this.api.post<any>('dispute',
      { orderID: orderId, reason },
      { responseType: 'text' }
    );
  }

  getMyNotifications(): Observable<Notification[]> {
    return this.api.get<Notification[]>('notification');
  }

  markNotificationRead(notificationId: number): Observable<any> {
    return this.api.put<any>(`notification/${notificationId}`, {}, { responseType: 'text' });
  }

  getAllPolicies(): Observable<Policy[]> {
    return this.api.get<Policy[]>('policy');
  }

  rateStore(storeId: number, rating: number): Observable<any> {
    return this.api.post<any>(`order/rate-store/${storeId}`, rating, { responseType: 'text' });
  }
}