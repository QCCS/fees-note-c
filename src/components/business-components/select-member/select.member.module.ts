import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../../../pipes/pipes.module';
import { SelectMemberPage } from './select.member';

@NgModule({
  declarations: [
    SelectMemberPage
  ],
  imports: [
    IonicPageModule.forChild(SelectMemberPage),
    PipesModule
  ],
  exports: [
    SelectMemberPage
  ]
})

export class SelectMemberPageModule { }
