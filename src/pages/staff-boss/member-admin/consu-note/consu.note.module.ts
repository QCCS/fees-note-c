import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { consuNotePage } from './consu.note';

@NgModule({
  declarations: [
    consuNotePage,
  ],
  imports: [
    IonicPageModule.forChild(consuNotePage),
  ],
  exports: [
    consuNotePage
  ]
})

export class consuNotePageModule { }
