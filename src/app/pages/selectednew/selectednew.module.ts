import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectednewPageRoutingModule } from './selectednew-routing.module';

import { SelectednewPage } from './selectednew.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectednewPageRoutingModule,ComponentsModule
  ],
  declarations: [SelectednewPage]
})
export class SelectednewPageModule {}
