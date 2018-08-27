import {Injectable} from '@angular/core';
import {ToastController, LoadingController,Events} from 'ionic-angular';

//记住订单信息，可以去新增会员，之后跳回
@Injectable()
export class PayOrderService {
  private total;
  private list;

  constructor(private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              public events: Events) {
  }


  //添加商品
  addGoods(){

  }

}

