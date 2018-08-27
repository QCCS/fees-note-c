import { Component } from '@angular/core';
import { NavController ,IonicPage,ToastController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,) {

  }

  showToast(position: string,message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position
    });
    toast.present(toast);
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

  checkVerson(){
    this.showToast('top','已是最新版本');
  }

  openBrowervip(){
    this.navCtrl.push('BrowserPage', {
      browser: {
        title: '网页',
        // url: '这里放置访问的页面链接'
        url: 'http://json119.com/Api/Static/term'
      }
    });
  }
  serviceRule(){
    this.navCtrl.push('BrowserPage', {
      browser: {
        title: '服务条款',
        // url: '这里放置访问的页面链接'
        url: 'http://json119.com/Api/Static/about'
      }
    });
  }
  els(){
    this.navCtrl.push('BrowserPage', {
      browser: {
        title: '俄罗斯方块',
        url: 'https://chvin.github.io/react-tetris/'
      }
    });
  }

}

