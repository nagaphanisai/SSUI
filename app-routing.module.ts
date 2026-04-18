import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [RoleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'seller',
    loadChildren: () => import('./seller-shell.component.ts/seller.module').then(m => m.SellerModule),
    canActivate: [RoleGuard],
    data: { roles: ['Seller'] }
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
    canActivate: [RoleGuard],
    data: { roles: ['Customer'] }
  },
  {
    path: 'logistics',
    loadChildren: () => import('./logistics/logistics.module').then(m => m.LogisticsModule),
    canActivate: [RoleGuard],
    data: { roles: ['Logistics'] }
  },
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}