import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../../../pipes/pipes.module';
import { SelectGoodsModalPage } from './select.goods.modal';

@NgModule({
  declarations: [
    SelectGoodsModalPage
  ],
  imports: [
    IonicPageModule.forChild(SelectGoodsModalPage),
    PipesModule
  ],
  exports: [
    SelectGoodsModalPage
  ]
})

export class SelectGoodsModalPageModule { }
