import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ShipmentItem } from '../models/models';

@Injectable({ providedIn: 'root' })
export class LogisticsService {

  constructor(private api: ApiService) {}

  getAllShipments(): Observable<ShipmentItem[]> {
    return this.api.get<ShipmentItem[]>('shipment/all');
  }

  createShipment(orderId: number, carrier: string, trackingNumber: string): Observable<any> {
    return this.api.post<any>('shipment',
      { orderID: orderId, carrier, trackingNumber },
      { responseType: 'text' }
    );
  }

  updateShipmentStatus(shipmentId: number, status: string): Observable<any> {
    return this.api.put<any>(`shipment/update-status/${shipmentId}`,
      { status },
      { responseType: 'text' }
    );
  }

  getReadyOrders(): Observable<any[]> {
    return this.api.get<any[]>('shipment/ready-orders');
  }
}