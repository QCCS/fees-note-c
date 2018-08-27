import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoodsDetailPage } from './goods.detail';
import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    GoodsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(GoodsDetailPage),
    PipesModule
  ],
  exports: [
    GoodsDetailPage
  ]
})

export class GoodsDetailPageModule { }
