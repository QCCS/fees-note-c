import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../../../pipes/pipes.module';

import { SelectPointGoodsModalPage } from './select.point.goods.modal';

@NgModule({
  declarations: [
    SelectPointGoodsModalPage
  ],
  imports: [
    IonicPageModule.forChild(SelectPointGoodsModalPage),
    PipesModule
  ],
  exports: [
    SelectPointGoodsModalPage
  ]
})

export class SelectPointGoodsModalPageModule { }
