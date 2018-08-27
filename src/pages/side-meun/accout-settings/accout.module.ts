import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccoutPage } from './accout';

@NgModule({
  declarations: [
    AccoutPage,
  ],
  imports: [
    IonicPageModule.forChild(AccoutPage),
  ],
  exports: [
    AccoutPage
  ]
})

export class AccoutPageModule { }
