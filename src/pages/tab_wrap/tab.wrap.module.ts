import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { TabWrapPage } from './tab.wrap';
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
@NgModule({
  declarations: [
    TabWrapPage,
  ],
  imports: [
    IonicPageModule.forChild(TabWrapPage),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory:(createTranslateLoader),
      deps: [Http]
    }),
  ],
  exports: [
    TabWrapPage
  ]
})
export class TabWrapPageModule { }

