import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { OrderDetailPage } from './order.detail';
import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    OrderDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderDetailPage),
    PipesModule
  ],
  exports: [
    OrderDetailPage
  ]
})

export class OrderDetailPageModule { }
