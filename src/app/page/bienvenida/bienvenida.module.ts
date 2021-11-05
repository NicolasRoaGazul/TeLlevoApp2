import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BienvenidaPageRoutingModule } from './bienvenida-routing.module';

import { BienvenidaPage } from './bienvenida.page';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BienvenidaPageRoutingModule,
    MatButtonModule
  ],
  declarations: [BienvenidaPage]
})
export class BienvenidaPageModule {}
