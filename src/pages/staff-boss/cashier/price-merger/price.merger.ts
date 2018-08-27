import { Component } from '@angular/core';
import { Platform ,NavParams,IonicPage,AlertController,
  ViewController,ToastController,NavController} from 'ionic-angular';
import { Xzg } from '../../../../providers/util/xzg';

//会员打折与一键抹零，订单支付
@IonicPage()
@Component({
  selector: 'price-merger-page',
  templateUrl: 'price.merger.html'
})
export class PriceMergerModalPage {

  //会员电话与会员详情
  memberMoblie:any;
  member:any = {
    id:false
  };
  // originPrice: number = 3000;
  // targetPrice: number = 3000;
  // contrast: number = 100;
  //
  //
  // brightness: number = 20;
  // warmth: number = 1300;
  // structure: any = { lower: 33, upper: 60 };
  // text: number = 0;

  constructor(
    public alertCtrl: AlertController,
    public platform: Platform,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public params: NavParams,
    public xzg: Xzg,
    public viewCtrl: ViewController
  ) {

  }

  // 查找会员
  searchMember(){
    let param = {
      mobile: this.memberMoblie
    };
    this.xzg.httpGet(this.xzg.api.ApiMembergetMemberByMobile, param,(body)=>{
      console.log(body)
      this.member = body.data;
    },true);
  }

  //去新增会员
  goToMember(){
    this.navCtrl.push('MemberDetailPage',{action:"create"});
  }
  //取消
  dismiss() {
    this.viewCtrl.dismiss();
  }

  //确定
  conform(){
    this.viewCtrl.dismiss(this.member);
  }

  //会员充值:输入金额
  goToMemberBalance(member){
    let prompt = this.alertCtrl.create({
      title: '充值',
      message: "请输入大约 1 的整数",
      inputs: [
        {
          name: 'val',
          placeholder: '请输入：',
          value:'100'
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
            this.recharge(parseInt(data.val));
          }
        }
      ]
    });
    prompt.present();
  }
  //会员充值
  recharge(money){
    let param = {
      id:this.member.id,
      money:money
    }
    this.xzg.httpPostBody(this.xzg.api.ApiMemberrecharge, param,(body)=>{
      this.xzg.showToast('top', body.msg);
      this.searchMember();
    },true);
  }
  // tpChange(){
  //   this.targetPrice = this.contrast * this.originPrice/100;
  //   console.log(this.targetPrice)
  // }

}

