import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoodsAdminPage } from './goods.admin';
import { PipesModule } from '../../../pipes/pipes.module';
@NgModule({
  declarations: [
    GoodsAdminPage
  ],
  imports: [
    IonicPageModule.forChild(GoodsAdminPage),
    PipesModule
  ],
  exports: [
    GoodsAdminPage
  ]
})

export class GoodsAdminPageModule { }
