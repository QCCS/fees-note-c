//公共模块
import { SharedModule } from './shared.module';
import { NgModule,ErrorHandler } from '@angular/core';
import { IonicApp,IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { MyApp } from './app.component';
//必要模块，公共组件，公共服务
import { MODULES, PROVIDERS } from './app.imports';
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    MODULES,
    IonicModule.forRoot(MyApp,{
       tabsHideOnSubPages: 'true'         //隐藏全部子页面tabs
    }),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory:(createTranslateLoader),
      deps: [Http]
    }),
    SharedModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    PROVIDERS,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

export class AppModule { }
