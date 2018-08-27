import { Component } from '@angular/core';

import { NavController, IonicPage ,Events,ToastController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'manage-page-list',
  templateUrl: './manage.page.html'
})

export class TabManage {
  pages: Array<{ title: string, component: any, active: boolean, icon: string,back: boolean, }>;
  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public events: Events) {

    this.pages = [
      { title: '商品管理', component: 'GoodsAdminPage', active: false, icon: 'logo-buffer',back:false },
      { title: '积分商品', component: 'PointGoodsPage', active: true, icon: 'archive',back:false },
      { title: '店员管理', component: 'StaffAdminPage', active: false, icon: 'contacts',back:false },
      { title: '积分设置', component: 'PointSettingsPage', active: false, icon: 'grid',back:false },
      { title: '店铺设置', component: 'SysSettingsPage', active: false, icon: 'settings',back:false },
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


