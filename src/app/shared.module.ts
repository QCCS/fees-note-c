import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DIRECTIVES } from './app.imports';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';

// 导入公共模块
@NgModule({
  declarations: [
    DIRECTIVES
  ],
  imports: [
    IonicModule,
    PipesModule,
    ComponentsModule,
  ],
  exports: [
    ComponentsModule,
    PipesModule
  ]
})

export class SharedModule { }
