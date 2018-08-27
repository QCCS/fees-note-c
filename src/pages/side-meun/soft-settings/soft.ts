import { Component } from '@angular/core';
import { AlertController ,IonicPage} from 'ionic-angular';
import { AppState } from '../../../app/app.global';
@IonicPage()
@Component({
  selector: 'page-soft',
  templateUrl: 'soft.html'
})
export class SoftPage {

  //主题与语言都需要通过接口保存到用户信息里面
  SoftColor : any = "白色";
  SoftLang: any = "简体中文";

  constructor(public alertCtrl: AlertController,
              public global: AppState) {
  }
  doColorRadio() {
    const alert = this.alertCtrl.create();
    alert.setTitle('设置皮肤');

    alert.addInput({
      type: 'radio',
      label: '黑色',
      value: 'theme-dark',
    });
    alert.addInput({
      type: 'radio',
      label: '白色',
      value: '',
      checked: true
    });


    alert.addButton('取消');
    alert.addButton({
      text: '确定',
      handler: (data: any) => {


        if(data == ''){
          this.SoftColor = "白色";
        }else if(data == 'theme-dark'){
          this.SoftColor = "黑色";
        }else {
          this.SoftColor = "白色";
        }


        this.changeTheme(data);
      }
    });
    alert.present();
  }

  //设置主题
  changeTheme(theme) {
    this.global.set('theme', theme);
  }


  doLangRadio() {
    const alert = this.alertCtrl.create();
    alert.setTitle('设置语言');

    alert.addInput({
      type: 'radio',
      label: '简体中文',
      value: 'zh_cn'
    });

    alert.addInput({
      type: 'radio',
      label: '英文',
      value: 'en'
    });

    alert.addButton('取消');
    alert.addButton({
      text: '确定',
      handler: (data: any) => {
        console.log('Radio data:', data);
        if(data == 'zh_cn'){
          this.SoftLang = "简体中文";
        }else if(data == 'en'){
          this.SoftLang = "英文";
        }else {
          this.SoftLang = "简体中文";
        }
      }
    });
    alert.present();
  }
}

