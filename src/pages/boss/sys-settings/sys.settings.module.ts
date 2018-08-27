import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SysSettingsPage } from './sys.settings';

@NgModule({
  declarations: [
    SysSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SysSettingsPage),
  ],
  exports: [
    SysSettingsPage
  ]
})

export class SysSettingsPageModule { }
