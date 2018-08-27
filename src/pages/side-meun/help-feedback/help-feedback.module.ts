import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelpFeedbackPage } from './help-feedback';

@NgModule({
  declarations: [
    HelpFeedbackPage,
  ],
  imports: [
    IonicPageModule.forChild(HelpFeedbackPage),
  ],
  exports: [
    HelpFeedbackPage
  ]
})

export class HelpFeedbackPageModule { }
