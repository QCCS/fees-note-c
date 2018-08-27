import { Component } from '@angular/core';
import {NavController ,IonicPage,ToastController,Events,NavParams} from 'ionic-angular';
import { Localstorage } from '../../providers/util/localstorage';
import { Xzg } from '../../providers/util/xzg';
import 'rxjs/add/operator/toPromise';
import { Md5 } from 'ts-md5/dist/md5';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  //设置首页
  home: any = 'TabWrapPage';
  //手机号与密码
  mobile: any = '';
  password: any = '';
  account_msg:any = '';

  constructor(public navCtrl: NavController,
              public xzg: Xzg,
              public events: Events,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public localstorage: Localstorage) {
  }

  showToast(position: string,message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }

  ionViewDidEnter(){
    this.account_msg = this.navParams.get("msg");
    console.log(this.account_msg)
  }
  //登陆
  login(){
    let param = {
      mobile: this.mobile,
      password:  Md5.hashStr(this.password)
    }
    this.xzg.httpPost(this.xzg.api.ApiLoginlogin, param,(body)=>{
      this.setToken(body.data);
    },true);
  }

  setToken(data){

    let fs = (new Date()).getTime();
    // 过期时间
    let expires = fs + data.expires*1000;
    this.localstorage.set('expires',expires);

    this.localstorage.set('mobile', this.mobile);
    this.localstorage.set('type',data.type);
    this.localstorage.set('refresh_token',data.refresh_token);
    this.localstorage.set('token_deadline',data.token_deadline);
    this.localstorage.set('token',data.token);
    this.navCtrl.setRoot(this.home);
    this.events.publish('user:login', true, Date.now());
  }

  sign() {
    this.showToast('top','占不支持');
  }
}

