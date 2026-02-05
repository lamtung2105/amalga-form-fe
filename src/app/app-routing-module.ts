import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderRequest } from './order-request/order-request';
import { Prescription } from './prescription/prescription';

const routes: Routes = [
  {
    path: 'order',
    component: OrderRequest,
  },
  {
    path: 'prescription',
    component: Prescription,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
