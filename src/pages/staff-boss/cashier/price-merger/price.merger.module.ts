import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../../../../pipes/pipes.module';
import { PriceMergerModalPage } from './price.merger';
@NgModule({
  declarations: [
    PriceMergerModalPage
  ],
  imports: [
    IonicPageModule.forChild(PriceMergerModalPage),
    PipesModule
  ],
  exports: [
    PriceMergerModalPage
  ]
})

export class PriceMergerModalPageModule { }
