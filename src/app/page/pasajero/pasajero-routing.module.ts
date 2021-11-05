import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { PasajeroPage } from './pasajero.page';

const routes: Routes = [
  {
    path: '',
    component: PasajeroPage,
    children:[
 

  ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasajeroPageRoutingModule {}
