import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TabManage } from './manage.page';

@NgModule({
  declarations: [
    TabManage
  ],
  imports: [
    IonicPageModule.forChild(TabManage)
  ],
  exports: [
    TabManage
  ]
})
export class ManagePageModule { }
