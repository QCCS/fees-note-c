import { Component } from '@angular/core';
import { Platform ,NavParams,ViewController,IonicPage,ToastController} from 'ionic-angular';
import { Xzg } from '../../../../providers/util/xzg';
@IonicPage()
@Component({
  selector: 'member-level-modal',
  templateUrl: 'member.level.html'
})
export class MemberLevelModalPage {

  title:any = "编辑";
  memberCopy :any;
  member:any = {
    title:"",
    upgrade_money:"",
    discount:""
  };
  constructor(
    public platform: Platform,
    public toastCtrl: ToastController,
    public params: NavParams,
    public xzg: Xzg,
    public viewCtrl: ViewController
  ) {
    //收到传入的数据
    console.log(this.params.data)
    if(this.params.data.title){
      this.member = this.params.data;
      this.title = "编辑";
      this.memberCopy = Object.assign({}, this.member);

    }else {
      this.member = this.member;
      this.title = "添加";
    }
  }

  cancelMemberLevel(){
    if(this.title == "编辑"){
      // 需要深度拷贝一份
      this.viewCtrl.dismiss( this.memberCopy);
    }else {
      this.viewCtrl.dismiss( []);
    }

  }
  saveMemberLevel(){
    //这是从模态框传回的数据
    this.viewCtrl.dismiss( this.member );
  }
  deleteMemberLevel(member){
    let data = {
      id:member.id
    }
    this.xzg.httpGet(this.xzg.api.ApiMemberConfigdeleteMemberLevel, data,(body)=>{
      console.log(body)
      this.viewCtrl.dismiss( []);
    },true);
  }
}

