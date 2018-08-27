import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PipesModule } from '../../../../pipes/pipes.module';
import { MemberLevelModalPage } from './member.level';
@NgModule({
  declarations: [
    MemberLevelModalPage
  ],
  imports: [
    IonicPageModule.forChild(MemberLevelModalPage),
    PipesModule
  ],
  exports: [
    MemberLevelModalPage
  ]
})

export class MemberLevelModalPageModule { }
