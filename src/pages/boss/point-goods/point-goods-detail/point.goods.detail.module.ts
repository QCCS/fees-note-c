import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PointGoodsDetailPage } from './point.goods.detail';

@NgModule({
  declarations: [
    PointGoodsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PointGoodsDetailPage),
  ],
  exports: [
    PointGoodsDetailPage
  ]
})

export class PointGoodsDetailPageModule { }
