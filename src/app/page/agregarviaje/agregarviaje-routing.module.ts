import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentDosComponent } from 'src/app/components/component-dos/component-dos.component';
import { ComponentUnoComponent } from 'src/app/components/component-uno/component-uno.component';
import { AgregarviajePage } from './agregarviaje.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarviajePage,
    children:[
      {
        path: 'uno',
        component: ComponentUnoComponent
      },
      {
        path: 'dos',
        component: ComponentDosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarviajePageRoutingModule {}
