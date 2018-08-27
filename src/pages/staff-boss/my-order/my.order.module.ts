import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyOrderPage } from './my.order';
import { PipesModule } from '../../../pipes/pipes.module';
@NgModule({
  declarations: [
    MyOrderPage
  ],
  imports: [
    IonicPageModule.forChild(MyOrderPage),
    PipesModule
  ],
  exports: [
    MyOrderPage
  ]
})

export class MyOrderPageModule { }
