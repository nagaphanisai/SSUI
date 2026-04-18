import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LogisticsService } from '../../core/services/logistics.service';
import { ShipmentItem } from '../../core/models/models';

@Component({
  selector: 'app-logistics-shipments',
  templateUrl: './logistics-shipments.component.html',
  styleUrls: ['./logistics-shipments.component.css'],
  standalone: false
})
export class LogisticsShipmentsComponent implements OnInit {
  shipments: ShipmentItem[] = [];
  readyOrders: any[] = [];
  loading = true;
  errorMsg = '';
  successMsg = '';

  // Create-shipment form
  showForm = false;
  newOrderId: number | null = null;
  newCarrier = '';
  newTrackingNumber = '';
  saving = false;

  constructor(private logistics: LogisticsService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { this.loadAll(); }

  loadAll(): void {
    this.loading = true;
    this.cdr.detectChanges();

    this.logistics.getAllShipments().subscribe({
      next: (data) => {
        this.shipments = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to load shipments';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });

    this.logistics.getReadyOrders().subscribe({
      next: (data) => {
        this.readyOrders = data || [];
        this.cdr.detectChanges();
      },
      error: () => { this.readyOrders = []; }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.newOrderId = null;
    this.newCarrier = '';
    this.newTrackingNumber = '';
    this.errorMsg = '';
  }

  createShipment(): void {
    if (!this.newOrderId || !this.newCarrier.trim() || !this.newTrackingNumber.trim()) {
      this.errorMsg = 'Order, carrier, and tracking number are required.';
      return;
    }
    this.saving = true;
    this.cdr.detectChanges();

    this.logistics.createShipment(this.newOrderId, this.newCarrier.trim(), this.newTrackingNumber.trim())
      .subscribe({
        next: () => {
          this.saving = false;
          this.successMsg = 'Shipment created. Mark it as Shipped to notify the customer.';
          this.toggleForm();
          this.loadAll();
          setTimeout(() => { this.successMsg = ''; this.cdr.detectChanges(); }, 3000);
        },
        error: (err) => {
          this.saving = false;
          this.errorMsg = err.error || 'Failed to create shipment';
          this.cdr.detectChanges();
        }
      });
  }

  updateStatus(shipment: ShipmentItem, newStatus: string): void {
    this.logistics.updateShipmentStatus(shipment.shipmentID, newStatus).subscribe({
      next: () => {
        this.successMsg = `Shipment #${shipment.shipmentID} marked as ${newStatus}.`;
        this.loadAll();
        setTimeout(() => { this.successMsg = ''; this.cdr.detectChanges(); }, 2500);
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to update status';
        this.cdr.detectChanges();
      }
    });
  }

  canMarkShipped(status: string): boolean {
    return (status || '').toLowerCase() === 'dispatched';
  }

  getStatusClass(status: string): string {
    return (status || '').toLowerCase();
  }
}