import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CashierPage } from './cashier';
import { PipesModule } from '../../../pipes/pipes.module';
@NgModule({
  declarations: [
    CashierPage,
  ],
  imports: [
    IonicPageModule.forChild(CashierPage),
    PipesModule
  ],
  exports: [
    CashierPage
  ]
})

export class CashierPageModule { }
