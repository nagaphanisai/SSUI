import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { LogisticsShellComponent } from './shell/logistics-shell.component';
import { LogisticsShipmentsComponent } from './shipments/logistics-shipments.component';

const routes: Routes = [
  {
    path: '',
    component: LogisticsShellComponent,
    children: [
      { path: '', redirectTo: 'shipments', pathMatch: 'full' },
      { path: 'shipments', component: LogisticsShipmentsComponent }
    ]
  }
];

@NgModule({
  declarations: [LogisticsShellComponent, LogisticsShipmentsComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class LogisticsModule {}