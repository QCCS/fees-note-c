import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TabMy } from './my.page';

@NgModule({
  declarations: [
    TabMy
  ],
  imports: [
    IonicPageModule.forChild(TabMy)
  ],
  exports: [
    TabMy
  ]
})
export class MyPageModule { }
