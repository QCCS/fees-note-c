import { Component } from '@angular/core';
import { NavController,IonicPage ,AlertController,ToastController,NavParams,ModalController} from 'ionic-angular';
import {Localstorage} from "../../../providers/util/localstorage";
import { Xzg } from '../../../providers/util/xzg';

@IonicPage()
@Component({
  selector: 'my-order',
  templateUrl: 'my.order.html'
})
export class MyOrderPage {

  list:any[]=[];
  //总数
  total:any;
  //页码
  cPage:any = 1;
  //关键字
  myInputSearch:any='';
  constructor(public navCtrl: NavController,
              public xzg: Xzg,
              public alertCtrl: AlertController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public toastCtrl: ToastController,
              public localstorage: Localstorage) {

  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      if(this.cPage * 10 - 10 >= this.total){
        this.xzg.showToast('top',"已经加载完了");
        infiniteScroll.complete();
        return false;
      }else {
        this.getOrderList(this.cPage);
        infiniteScroll.complete();
      }
    }, 500);
  }
  onInputSearchbar(){
    this.cPage = 1;
    this.getOrderList(this.cPage);
  }



  ionViewDidEnter(){
      this.getOrderList(1);
  }


  getOrderList(page){
    if(page == 1){
      this.list = [];
    }
    this.cPage = page;
    this.cPage++;
    let param = {
      pagesize: 10,
      p: page
    }
    this.xzg.httpGet(this.xzg.api.ApiOrdergetOrderList, param,(body)=>{
      this.list = this.list.concat(body.data[0].orderlist);
      this.total = body.data[0].total;
    },true);
  }

  //删除
  deleteOrder(order){
    console.log(order)
    let param = {
      id: order.id
    }
    let confirm = this.alertCtrl.create({
      title: '提示',
      message: '确定要删除此订单吗？',
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
            this.xzg.httpGet(this.xzg.api.ApiOrderpayOrderCancel, param,(body)=>{
              this.xzg.showToast('top',"删除成功");
              this.getOrderList(1);
            },true);
          }
        }
      ]
    });
    confirm.present();
  }

  //查看详情
  goToOrderDetail(order) {
    this.navCtrl.push('OrderDetailPage',{
      id:order.id,
      action: "update"
    });
  }

}

