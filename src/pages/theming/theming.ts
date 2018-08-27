import { AppState } from '../../app/app.global';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage({ name: "theming", segment: "app"})
@Component({
  selector: 'page-theming',
  templateUrl: 'theming.html'
})
export class ThemingPage {


  constructor(public navCtrl: NavController, public global: AppState) { }

  changeTheme(theme) {
    this.global.set('theme', theme);
  }
}
