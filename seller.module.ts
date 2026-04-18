import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { SellerShellComponent } from './shell/seller-shell.component';
import { SellerDashboardComponent } from './dashboard/seller-dashboard.component';
import { SellerRegisterComponent } from './register-seller/seller-register.component';
import { SellerStoresComponent } from './stores/seller-stores.component';
import { SellerProductsComponent } from './products/seller-products.component';
import { SellerInventoryComponent } from './inventory/seller-inventory.component';
import { SellerOrdersComponent } from './orders/seller-orders.component';
import { SellerReturnsComponent } from './returns/seller-returns.component';
import { SellerProfileComponent } from './profile/seller-profile.component';

const routes: Routes = [
  {
    path: '',
    component: SellerShellComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: SellerDashboardComponent },
      { path: 'register-seller', component: SellerRegisterComponent },
      { path: 'stores', component: SellerStoresComponent },
      { path: 'products', component: SellerProductsComponent },
      { path: 'inventory', component: SellerInventoryComponent },
      { path: 'orders', component: SellerOrdersComponent },
      { path: 'returns', component: SellerReturnsComponent },
      { path: 'profile', component: SellerProfileComponent }
    ]
  }
];

@NgModule({
  declarations: [
    SellerShellComponent,
    SellerDashboardComponent,
    SellerRegisterComponent,
    SellerStoresComponent,
    SellerProductsComponent,
    SellerInventoryComponent,
    SellerOrdersComponent,
    SellerReturnsComponent,
    SellerProfileComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class SellerModule {}