import { Component } from '@angular/core';
import { NavController,IonicPage,ModalController,NavController ,AlertController} from 'ionic-angular';
import { Xzg } from '../../../providers/util/xzg';
@IonicPage()
@Component({
  selector: 'page-point-exchange',
  templateUrl: 'point.exchange.html'
})
export class PointExchangePage {
  public event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }
  member:any = {
    id:false
  }
  pointGoods:any = {
    id:false
  };
  constructor(public navCtrl: NavController,
              public xzg: Xzg,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController) {

  }

  //查找会员
  searchMember(){
    let params = {
      mobile:"1592152946"
    }
    let modal = this.modalCtrl.create('PriceMergerModalPage',params);
    modal.present();
    modal.onWillDismiss((data: any[]) => {
      if (data) {
        console.log(data);
        this.member = data;
      }
    });
  }

  //选择积分商品
  getPointGoods(){
    let params = {
      type:"NAME",
      goodsName:""
    }
    let modal = this.modalCtrl.create('SelectPointGoodsModalPage',params);
    modal.present();
    modal.onWillDismiss((data: any[]) => {
      if (data) {
        console.log(data);
        if(data.length > 0){
          this.pointGoods = data[0];
          if(data.length > 1){
            this.xzg.showToast("top","多个商品，只取第一个");
          }
        }

      }
    });
  }

  //确定兑换
  confirmExchange(){
    let param = {
      member_id:this.member.id,
      goods_id:this.pointGoods.id
    }
    this.xzg.httpPostBody(this.xzg.api.ApiScoreOrderbuildOrder, param,(body)=>{
      console.log(body);
      this.xzg.showToast("top","兑换成功");
      this.navCtrl.pop();
    },true);
  }

  // 取消兑换
  cancelExchange(){
    let confirm = this.alertCtrl.create({
      title: '提示',
      message: '确定取消兑换吗？',
      buttons: [
        {
          text: '取消',
          handler: () => {

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

  }


