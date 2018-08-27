import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SoftPage } from './soft';

@NgModule({
  declarations: [
    SoftPage,
  ],
  imports: [
    IonicPageModule.forChild(SoftPage),
  ],
  exports: [
    SoftPage
  ]
})

export class SoftPageModule { }
