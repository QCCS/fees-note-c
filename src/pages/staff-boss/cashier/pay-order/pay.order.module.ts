import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayOrderPage } from './pay.order';

@NgModule({
  declarations: [
    PayOrderPage
  ],
  imports: [
    IonicPageModule.forChild(PayOrderPage),
  ],
  exports: [
    PayOrderPage
  ]
})

export class PayOrderPageModule { }
