import { Component } from '@angular/core';

import { NavController, IonicPage ,Events,ToastController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'my-page-list',
  templateUrl: './my.page.html',
})

export class TabMy {
  pages: Array<{ title: string, component: any, active: boolean, icon: string,back: boolean, }>;
  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public events: Events,) {

    this.pages = [
      { title: '我的业绩', component: 'MyAchievementPage', active: true, icon: 'analytics',back:false },
      { title: '我的订单', component: 'MyOrderPage', active: true, icon: 'clipboard',back:false },
    ];
  }


  //沟崽子们
  ionViewDidLoad(){
    console.log('触发ionViewDidLoad');
  }

  ionViewWillEnter(){
    console.log('触发ionViewWillEnter');
  }

  ionViewDidEnter(){
    this.events.publish('meun:enable', true);
  }

  ionViewWillLeave(){
    console.log('触发ionViewWillLeave');
    this.events.publish('meun:enable', false);
  }

  ionViewDidLeave(){
    console.log('触发ionViewDidLeave');

  }

  ionViewWillUnload(){
    console.log('触发ionViewWillUnload');
  }

  showToast(position: string,message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }

  openPage(page) {

    // this.nav.setRoot(page.component);
    if(!page.back){
      this.navCtrl.push(page.component);
    }else {
      // this.navCtrl.setRoot(page.component);
      this.showToast('top',"正在开发中... ...");
    }
  }
}


