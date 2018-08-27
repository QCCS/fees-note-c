import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyAchievementPage } from './my.achievement';
import { AngularEchartsModule } from 'ngx-echarts';
@NgModule({
  declarations: [
    MyAchievementPage,
  ],
  imports: [
    AngularEchartsModule,
    IonicPageModule.forChild(MyAchievementPage),
  ],
  exports: [
    MyAchievementPage
  ]
})

export class MyAchievementPageModule { }
