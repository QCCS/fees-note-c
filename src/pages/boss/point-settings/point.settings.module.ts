import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PointSettingsPage } from './point.settings';

@NgModule({
  declarations: [
    PointSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(PointSettingsPage),
  ],
  exports: [
    PointSettingsPage
  ]
})

export class PointSettingsPageModule { }
