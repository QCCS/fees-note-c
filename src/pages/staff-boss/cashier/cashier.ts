import { Component ,ViewChild} from '@angular/core';
import { NavController ,NavParams,ModalController,IonicPage,Navbar,AlertController} from 'ionic-angular';
import {NativeService} from "../../../providers/NativeService";
import { Xzg } from '../../../providers/util/xzg';
import { CashierService } from './cashier.service';
@IonicPage()
@Component({
  selector: 'page-cashier',
  templateUrl: 'cashier.html'
})
export class CashierPage {
  @ViewChild(Navbar) navBar: Navbar;
  list:any = [];
  params:any;
  goodsName:any = "";
  qcode:any;
  total:any = 0;
  clear:any = false;
  footerFixed:any = true;
  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public navParams: NavParams,
              public xzg: Xzg,
              private cashierService: CashierService,
              private nativeService: NativeService,
              public modalCtrl: ModalController) {
    this.params = {};

  }
  ionViewDidEnter(){
    this.setBackButtonAction();
    this.setView();
  }
  ionViewDidLoad() {

  }

  //自定义返回按钮动作
  setBackButtonAction(){
    this.navBar.backButtonClick = () => {

      this.cancelOrder();
    }
  }
  setView(){
    console.log(this.cashierService.getGoodsList());
    this.list = this.cashierService.getGoodsList();
    this.total = this.cashierService.getGoodsTotal();
  }

  cost_numFocus($event,good){
    this.footerFixed = false;
  }
  cost_numBlur($event,good){
    this.footerFixed = true;
  }
  //通过输入名字查找商品
  getItems(){
    this.params.type = 'NAME';
    this.params.goodsName = this.goodsName;
    this.selectGoods();
  }

  //扫码找商品
  scanGood(){
    this.params.type = 'CODE';
    this.nativeService.scan().then(barcodeData => {
      this.qcode = barcodeData;
      this.params.qcode = barcodeData;
      this.selectGoods();
    });
  }

  //扫描后，在模态框中选择商品
  selectGoods(){
    let modal = this.modalCtrl.create('SelectGoodsModalPage',this.params);
    modal.present();
    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.goodsName = '';
        console.log(data)
        this.cashierService.addGoodsList(data);
        this.setView();
      }
    });
  }


  //减少单个商品
  minGoodCount(good){
    this.cashierService.minGoodCount(good);
    this.setView();
  }
  //输入商品数量
  cost_numChange($event,good) {
    this.cashierService.cost_numChange($event,good);
    this.setView();
  }

  //添加单个商品
  addGoodCount(good){
    this.cashierService.addGoodCount(good);
    this.setView()
  }
  //删除已经选择的商品
  deleteGood(good,index){
    this.cashierService.deleteGood(good,index);
    this.setView()
  }

  //去支付
  payOrder(){
    //购物车里面商品必须大于1，才可以去结账
    let param = {
      goods_list: this.list,
      total_price: this.total
    }
    this.navCtrl.push('PayOrderPage',param);
  }

  cancelOrder(){
    let confirm = this.alertCtrl.create({
      title: '提示',
      message: '是否要清空已选商品？',
      buttons: [
        {
          text: '不清空',
          handler: () => {
            this.navCtrl.pop();
          }
        },
        {
          text: '清空',
          handler: () => {
            this.cashierService.reset();
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();

  }

}

