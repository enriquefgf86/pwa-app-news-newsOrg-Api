import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectednewPage } from './selectednew.page';

const routes: Routes = [
  {
    path: '',
    component: SelectednewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectednewPageRoutingModule {}
