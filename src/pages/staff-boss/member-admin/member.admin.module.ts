import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberAdminPage } from './member.admin';
import { PipesModule } from '../../../pipes/pipes.module';
@NgModule({
  declarations: [
    MemberAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberAdminPage),
    PipesModule
  ],
  exports: [
    MemberAdminPage
  ]
})

export class MemberAdminPageModule { }
