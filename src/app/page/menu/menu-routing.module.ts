import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [{
    
        path: 'agregarviaje',
        loadChildren: () => import('../agregarviaje/agregarviaje.module').then( m => m.AgregarviajePageModule),

      },
      {
        path: 'bienvenida',
        loadChildren: () => import('../bienvenida/bienvenida.module').then( m => m.BienvenidaPageModule),
      },
      {
        path: 'pasajero',
        loadChildren: () => import('../pasajero/pasajero.module').then( m => m.PasajeroPageModule),

      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule),

      }
 
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
