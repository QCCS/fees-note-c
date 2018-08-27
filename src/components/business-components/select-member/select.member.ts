import { Component } from '@angular/core';
import { Platform ,NavParams,ViewController,IonicPage,ToastController} from 'ionic-angular';
import { Xzg } from '../../../providers/util/xzg';
//选择会员的组件:单选一个会员
@IonicPage()
@Component({
  selector: 'select-member',
  templateUrl: 'select.member.html'
})
export class SelectMemberPage {

  list:any=[];
  mobile:any = "";
  total:any;
  constructor(
    public platform: Platform,
    public toastCtrl: ToastController,
    public params: NavParams,
    public xzg: Xzg,
    public viewCtrl: ViewController
  ) {
    //收到传入的数据
    console.log(this.params.data)
    this.getMemberList();
  }

  getMemberList(){
    let param = {
      pagesize: 20,
      p: 1,
      mobile: this.mobile
    }
    this.xzg.httpGet(this.xzg.api.ApiMembergetMemberList, param,(body)=>{
      console.log(body);
      this.list = body.data[0].memberlist;
      this.total = body.data[0].total;
    },true);
  }

  //确定
  confirm(member) {
    //这是从模态框传回的数据
    this.viewCtrl.dismiss( member );
  }
  //取消
  dismissCancel(){
    this.viewCtrl.dismiss( []);
  }

}

