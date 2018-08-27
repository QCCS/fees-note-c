import { Component } from '@angular/core';
import { Platform ,NavParams,ViewController,ModalController,IonicPage,NavController,AlertController} from 'ionic-angular';
import { Xzg } from '../../../../providers/util/xzg';
import { CashierService } from '../cashier.service';

@IonicPage()
@Component({
  selector: 'pay-order-page',
  templateUrl: 'pay.order.html'
})
export class PayOrderPage {
  //商品
  list:any = [];
  total:any = 0;
  //折后价
  discountTotal:any;
  member:any = {
    id:false
  }
  memberTotal:any = 0;
  // 订单id
  order_id:any = [];
  constructor(
    public platform: Platform,
    public alertCtrl: AlertController,
    public params: NavParams,
    private cashierService: CashierService,
    public xzg: Xzg,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController
  ) {
    this.list = this.cashierService.getGoodsList();
    this.total = this.cashierService.getGoodsTotal();
  }

  //返回收银台
  backCashier() {
    let confirm = this.alertCtrl.create({
      title: '提示',
      message: '确定返回收银台？',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

  // 回到收银台
  payOver(){
    let confirm = this.alertCtrl.create({
      title: '提示',
      message: '确定返回收银台？',
      buttons: [
        {
          text: '回首页',
          handler: () => {
            this.payOverGoHome();
          }
        },
        {
          text: '确定',
          handler: () => {
            this.cashierService.reset();
            this.navCtrl.popTo('CashierPage');
          }
        }
      ]
    });
    confirm.present();
  }
  // 回到首页
  payOverGoHome(){
    this.cashierService.reset();
    this.navCtrl.popTo('TabWrapPage');
  }

  //去新增会员
  goToMember(){
    this.navCtrl.push('MemberDetailPage',{action:"create"});
  }

  //查找会员
  searchMember(){
    let params = {
      mobile:"1592152946"
    }
    console.log(1);
    let modal = this.modalCtrl.create('PriceMergerModalPage',params);
    modal.present();
    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.member = data;
        this.discountTotal = this.member.discount * this.total / 10;
      }
    });
  }

  // 现金结账
  cashPay(){
    let param :any = {
      goods_list: "",
      total_price: "",
      payment_type: "",
      small_change: "",
      member_id: ""
    };
    //如果是会员
    if(this.member.id){
     param = {
        goods_list: this.list,
        payment_type: 1,
        small_change: 0,
        member_id: this.member.id,
        total_price:this.discountTotal
      }
    }else {
      param = {
        goods_list: this.list,
        total_price: this.total,
        payment_type: 1,
        small_change: 0
      }
    }
    this.xzg.httpPostBody(this.xzg.api.ApiOrderbuildOrder, param,(body)=>{
      console.log(body);
      this.xzg.showToast("top","结账成功");
      this.payOver();
      //要跳回收银台，并且清空
    },true);
  }
  // 余额结账(肯定有会员)
  balancePay(){
    let param = {
      goods_list: this.list,
      total_price: this.discountTotal,
      member_id: this.member.id,
      payment_type: 2,
      small_change: 0
    }
    this.xzg.httpPostBody(this.xzg.api.ApiOrderbuildOrder, param,(body)=>{
      this.xzg.showToast("top","结账成功");
      this.payOver();
      //要跳回收银台，并且清空
    },true);
  }
  // 一键抹零
  priceMerger(){
    alert("你正在使用一键抹零,这个稍后开发");
  }

}

