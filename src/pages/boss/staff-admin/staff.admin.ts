import { Component } from '@angular/core';
import { NavController ,IonicPage,ToastController,
  NavParams} from 'ionic-angular';
import { Xzg } from '../../../providers/util/xzg';
import {Localstorage} from "../../../providers/util/localstorage";
@IonicPage()
@Component({
  selector: 'page-staff-admin',
  templateUrl: 'staff.admin.html'
})
export class StaffAdminPage {
  list:any[]=[];
  //总数
  total:any;
  //页码
  cPage:any = 1;
  //关键字
  myInputSearch:any='';
  constructor(public navCtrl: NavController,
              public xzg: Xzg,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public localstorage: Localstorage) {

  }
  onInputSearchbar(){
    this.cPage = 1;
    this.getUserList(this.cPage,this.myInputSearch);
  }

  //showCancelButton为true才可以点击
  onCancelSearchbar(){
    console.log(this.myInputSearch)
  }
  ionViewDidEnter(){
    this.getUserList(1,this.myInputSearch);
  }
  doInfinite(infiniteScroll) {
    setTimeout(() => {
      if(this.cPage * 10 - 10 >= this.total){
        this.showToast('top',"已经加载完了");
        infiniteScroll.complete();
        return false;
      }else {
        this.getUserList(this.cPage,this.myInputSearch);
        infiniteScroll.complete();
      }
    }, 500);
  }

  getUserList(page,mobile){
    if(page == 1){
      this.list = [];
    }
    this.cPage = page;
    this.cPage++;
    let param = {
      pagesize: 10,
      p: page,
      mobile: mobile
    }
    this.xzg.httpGet(this.xzg.api.ApiUsergetUserList, param,(body)=>{
      this.list = this.list.concat(body.data[0].userlist);
      this.total = body.data[0].total;
    },true);
  }

  //删除
  deleteUser(user){
    let param = {
      id: user.id
    }
    this.xzg.httpGet(this.xzg.api.ApiUserdelUser, param,(body)=>{
      this.getUserList(1,this.myInputSearch);
    },true);
  }

  //创建
  addUserDetail() {
    this.navCtrl.push('StaffDetailPage',{action:"create"});
  }

  //查看详情
  goToUserDetail(user) {
    console.log(user);
    this.navCtrl.push('StaffDetailPage',{
      item: user.id,
      action: "update"
    });
  }
  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }
}

