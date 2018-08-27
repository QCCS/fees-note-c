import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PointExchangePage } from './point.exchange';

@NgModule({
  declarations: [
    PointExchangePage,
  ],
  imports: [
    IonicPageModule.forChild(PointExchangePage),
  ],
  exports: [
    PointExchangePage
  ]
})

export class PointExchangePageModule { }
