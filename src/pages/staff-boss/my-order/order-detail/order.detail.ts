import {Component} from '@angular/core';
import {AlertController,NavController, IonicPage, NavParams, ToastController} from 'ionic-angular';
import { Xzg } from '../../../../providers/util/xzg';
@IonicPage()
@Component({
  selector: 'order-detail',
  templateUrl: 'order.detail.html'
})
export class OrderDetailPage {
  //页面的标题
  title: any = "订单详情";
  //订单对象
  order: any= {
    state:"0",
    total_price:"0",
    create_time:"0",
    order_goods:[],
    status:false
  };
  //订单id
  orderId: any ;
  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public navParams: NavParams,
              public xzg: Xzg,
              public toastCtrl: ToastController) {

    this.orderId = this.navParams.data.id;
    if(this.orderId){
      this.getOrderDetail(this.orderId);
    }else {
      this.xzg.showToast('top', "无法获取订单详情");
    }
  }

  //是否要支付
  orderStateChange(){
    let confirm = this.alertCtrl.create({
      title: '提示',
      message: '此订单确定现在支付吗？',
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
           this.payOrder();
          }
        }
      ]
    });
    confirm.present();

  }

  //获取订单详情
  getOrderDetail(id){
    let param = {
      id: id
    };
    this.xzg.httpGet(this.xzg.api.ApiOrdergetOrder, param,(body)=>{
      this.xzg.showToast('top', body.msg);
      this.order = body.data;
    },true);
  }

  //支付订单
  payOrder(){
    let param = {
      orderId: this.order.id,
      paymentType: 1//支付方式
    }

    this.xzg.httpPost(this.xzg.api.ApiOrderpayOrder, param,(body)=>{
      this.getOrderDetail(this.orderId);
    },true);
  }


}

