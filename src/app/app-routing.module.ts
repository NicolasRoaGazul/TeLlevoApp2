import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IngresadoGuard } from './ingresado.guard';
import { NoIngresadoGuard } from './no-ingresado.guard';
import { RegistroGuard } from './registro.guard';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./page/home/home.module').then( m => m.HomePageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./page/inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./page/registro/registro.module').then( m => m.RegistroPageModule),
    canActivate: [NoIngresadoGuard]
  },

  {
    path: 'olvide',
    loadChildren: () => import('./page/olvide/olvide.module').then( m => m.OlvidePageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'not-found',
    loadChildren: () => import('./page/not-found/not-found.module').then( m => m.NotFoundPageModule),
    canActivate: [IngresadoGuard]
  },


  {
    path: 'menu',
    loadChildren: () => import('./page/menu/menu.module').then( m => m.MenuPageModule),
    canActivate: [IngresadoGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
