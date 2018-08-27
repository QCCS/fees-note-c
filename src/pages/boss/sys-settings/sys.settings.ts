import { Component } from '@angular/core';
import { NavController,IonicPage ,ModalController,AlertController} from 'ionic-angular';
import { Xzg } from '../../../providers/util/xzg';
@IonicPage()
@Component({
  selector: 'page-sys-settings',
  templateUrl: 'sys.settings.html'
})
export class SysSettingsPage {


  memberList :any = [
  ];

  memberSettings:any = {
    isEdit:false,
    save_count:1000,
    give_count:1000,
    give_score:1000
  }

  constructor(public navCtrl: NavController,
              public xzg: Xzg,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController) {

  }

  ionViewDidEnter(){
    this.getMemberList();
  }
  getMemberList(){
    let param = {
    }
    this.xzg.httpGet(this.xzg.api.ApiMemberConfiggetMemberLevelList, param,(body)=>{
                console.log(body)
      this.memberList = body.data
    },true);
  }


  //添加会员级别
  addMemberLevel(){
    let modal = this.modalCtrl.create('MemberLevelModalPage');
    modal.present();
    modal.onWillDismiss((data: any) => {
      if (data) {
        //重新刷新页面
        console.log(data)
        if(data.title){
          this.xzg.httpPostBody(this.xzg.api.ApiMemberConfigaddMemberLevel, data,(body)=>{
            console.log(body);
            this.getMemberList();
          },true);
        }else {
          this.getMemberList();
        }
      }
    });
  }

  // 编辑会员级别
  editMemberLevel(member){
    let modal = this.modalCtrl.create('MemberLevelModalPage',member);
    modal.present();

    modal.onWillDismiss((data: any) => {
      if (data) {
        //重新刷新页面
        console.log(data)
        if(data.id){
          this.xzg.httpPostBody(this.xzg.api.ApiMemberConfigeditMemberLevel, data,(body)=>{
            console.log(body);
            this.getMemberList();
          },true);
        }else {
          this.getMemberList();
        }
      }
    });
  }


  editMemberSettings(title,target) {
    let prompt = this.alertCtrl.create({
      title: title,
      message: "请输入大约 1 的整数",
      inputs: [
        {
          name: 'val',
          placeholder: '请输入：',
          value:this.memberSettings[target]
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '保存',
          handler: data => {
            this.memberSettings[target] = parseInt(data.val);
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }



}

