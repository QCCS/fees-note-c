import { Component ,ViewChild} from '@angular/core';
import { NavController,IonicPage ,Nav,ToastController,Events} from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import { TranslateService } from 'ng2-translate/ng2-translate';
import {NativeService} from "../../../providers/NativeService";
@IonicPage()
@Component({
  selector: 'home-page-list',
  templateUrl: './home.page.html',
  providers: [TranslateService]
})

export class TabHome {
  @ViewChild(Nav) nav: Nav;
  onDisconnect:boolean = false;
  netIsWork:any;
  pages: Array<{ title: string, component: any, active: boolean, icon: string,back: boolean, }>;
  constructor(public navCtrl: NavController,
              private nativeService: NativeService,
              public events: Events,
              public translate: TranslateService,
              public toastCtrl: ToastController) {

    this.nativeService.onDisconnect();
    this.nativeService.netIsWork();
    //disconnect
    events.subscribe('netWork:disconnect', (msg) => {
      this.onDisconnect = true;
    });
    //disconnect
    events.subscribe('netWork:connect', (msg) => {
      this.netIsWork = msg;
      if(this.netIsWork != "none"){
        this.onDisconnect = false;
      }
    });
    //每一个模块都需要加载语言模块，并且设置语言
    this.translate.use('zh_cn');

    this.pages = [
      { title: '收银台', component: 'CashierPage', active: false, icon: 'card',back:false },
      { title: '积分兑换', component: 'PointExchangePage', active: true, icon: 'git-compare',back:false },
      { title: '会员管理', component: 'MemberAdminPage', active: false, icon: 'people',back:false },

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



  //打开内置浏览器页面
  call119(){
    this.navCtrl.push('BrowserPage', {
      browser: {
        title: '网页',
        // url: '这里放置访问的页面链接'
        url: 'http://www.json119.com'
      }
    });
  }



}


