import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { CustomerShellComponent } from './shell/customer-shell.component';
import { CustomerDashboardComponent } from './dashboard/customer-dashboard.component';
import { CustomerProductsComponent } from './products/customer-products.component';
import { CustomerCartComponent } from './cart/customer-cart.component';
import { CustomerPaymentComponent } from './payment/customer-payment.component';
import { CustomerOrdersComponent } from './orders/customer-orders.component';
import { CustomerNotificationsComponent } from './notifications/customer-notifications.component';
import { CustomerPoliciesComponent } from './policies/customer-policies.component';
import { CustomerProfileComponent } from './profile/customer-profile.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerShellComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: CustomerDashboardComponent },
      { path: 'products', component: CustomerProductsComponent },
      { path: 'cart', component: CustomerCartComponent },
      { path: 'payment', component: CustomerPaymentComponent },
      { path: 'orders', component: CustomerOrdersComponent },
      { path: 'notifications', component: CustomerNotificationsComponent },
      { path: 'policies', component: CustomerPoliciesComponent },
      { path: 'profile', component: CustomerProfileComponent }
    ]
  }
];

@NgModule({
  declarations: [
    CustomerShellComponent,
    CustomerDashboardComponent,
    CustomerProductsComponent,
    CustomerCartComponent,
    CustomerPaymentComponent,
    CustomerOrdersComponent,
    CustomerNotificationsComponent,
    CustomerPoliciesComponent,
    CustomerProfileComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class CustomerModule {}