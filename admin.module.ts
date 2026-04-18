import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AdminShellComponent } from './shell/admin-shell.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';
import { AdminSellersComponent } from './sellers/admin-sellers.component';
import { AdminStoresComponent } from './stores/admin-stores.component';
import { AdminProductsComponent } from './products/admin-products.component';
import { AdminCustomersComponent } from './customers/admin-customers.component';
import { AdminLogisticsUsersComponent } from './logistics-users/admin-logistics-users.component';
import { AdminCategoriesComponent } from './categories/admin-categories.component';
import { AdminCommissionComponent } from './commission/admin-commission.component';
import { AdminPoliciesComponent } from './policies/admin-policies.component';
import { AdminDisputesComponent } from './disputes/admin-disputes.component';
import { AdminReturnsComponent } from './returns/admin-returns.component';

const routes: Routes = [
  {
    path: '',
    component: AdminShellComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'sellers', component: AdminSellersComponent },
      { path: 'stores', component: AdminStoresComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'customers', component: AdminCustomersComponent },
      { path: 'logistics-users', component: AdminLogisticsUsersComponent },
      { path: 'categories', component: AdminCategoriesComponent },
      { path: 'commission', component: AdminCommissionComponent },
      { path: 'policies', component: AdminPoliciesComponent },
      { path: 'disputes', component: AdminDisputesComponent },
      { path: 'returns', component: AdminReturnsComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AdminShellComponent,
    AdminDashboardComponent,
    AdminSellersComponent,
    AdminStoresComponent,
    AdminProductsComponent,
    AdminCustomersComponent,
    AdminLogisticsUsersComponent,
    AdminCategoriesComponent,
    AdminCommissionComponent,
    AdminPoliciesComponent,
    AdminDisputesComponent,
    AdminReturnsComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class AdminModule {}