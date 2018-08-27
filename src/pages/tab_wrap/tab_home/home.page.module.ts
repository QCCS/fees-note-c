import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabHome } from './home.page';
import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
@NgModule({
  declarations: [
    TabHome
  ],
  imports: [
    IonicPageModule.forChild(TabHome),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory:(createTranslateLoader),
      deps: [Http]
    }),
  ],
  exports: [
    TabHome
  ]
})
export class HomePageModule { }
