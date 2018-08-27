import { Component } from '@angular/core';
import { NavController ,IonicPage,Events} from 'ionic-angular';
import { Localstorage } from '../../../providers/util/localstorage';
import { Xzg } from '../../../providers/util/xzg';
@IonicPage()
@Component({
  selector: 'page-accout',
  templateUrl: 'accout.html'
})
export class AccoutPage {

  loginPage: any = 'LoginPage';

  account:any;
  constructor(public navCtrl: NavController,
              public events: Events,
              public xzg: Xzg,
              public localstorage: Localstorage) {


    this.account = {};
    this.account.username = '';
    this.account.group_name = '';
    this.account.mobile = '';
    this.account.avatar = '';
    this.localstorage.get("account").then((account)=>{
      this.account = account;
      console.log(account)
    });


  }


    updateAccount(){
     alert("修改正在开发")
    }

    logout() {

      this.localstorage.get("mobile").then((mobile)=>{
        let param = {
          mobile: mobile
        }
        this.xzg.httpGet(this.xzg.api.ApiLoginlogout, param,(body)=>{

          this.events.publish('user:logout', true, Date.now());
          //退出接口
          // http://json119.com/Api/Login/logout?mobile=MOBILE&token=TOKEN
          this.localstorage.clearStorage().then(()=>{
            console.log('Storage is clear');
            this.navCtrl.setRoot(this.loginPage);
          });

        },true);
      });







    }


}

