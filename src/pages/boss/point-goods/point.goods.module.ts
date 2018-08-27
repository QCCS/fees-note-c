import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PointGoodsPage } from './point.goods';
import { PipesModule } from '../../../pipes/pipes.module';
@NgModule({
  declarations: [
    PointGoodsPage,
  ],
  imports: [
    IonicPageModule.forChild(PointGoodsPage),
    PipesModule
  ],
  exports: [
    PointGoodsPage
  ]
})

export class PointGoodsPageModule { }
