import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffAdminPage } from './staff.admin';

@NgModule({
  declarations: [
    StaffAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(StaffAdminPage),
  ],
  exports: [
    StaffAdminPage
  ]
})

export class StaffAdminPageModule { }
