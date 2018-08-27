import {Component} from '@angular/core';
import {AlertController,NavController, IonicPage, NavParams, ToastController,
  ActionSheetController} from 'ionic-angular';
import {NativeService} from "../../../../providers/NativeService";
import {Localstorage} from "../../../../providers/util/localstorage";
import { Xzg } from '../../../../providers/util/xzg';

@IonicPage()
@Component({
  selector: 'page-goods-detail',
  templateUrl: 'goods.detail.html'
})


export class GoodsDetailPage {

  item: any;
  //是否是新增的标志
  action: string;
  //页面的标题
  title: string;
  //商品对象
  goods: any = {
    "type":0,
    "name": "",//名称
    "thumb":"",
    "sn": '',//条码
    "cost_price": "",//进货价
    "price": "",//售价
    "count": 1,//数量
    "deduct": "",//提成
    "remark":""//备注
  };

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public navParams: NavParams,
              public xzg: Xzg,
              public actionSheetCtrl: ActionSheetController,
              public localstorage: Localstorage,
              public toastCtrl: ToastController,
              private nativeService: NativeService) {

    this.action = this.navParams.get("action");
    if (this.action == "create") {
      this.title = "新增商品";
    } else if (this.action == "update") {
      this.title = "编辑商品";
    } else {
      this.title = "新增商品";
    }

    this.item = this.navParams.get("item");
    console.log(this.item)
    if(this.item){
      this.getGood(this.item);
    }else {
      console.log("新增")
      this.goods = this.goods;
    }
  }

  getGood(id){
    console.log(id)
    let param = {
      id: id
    };
    this.xzg.httpGet(this.xzg.api.ApiGoodsgetGoods, param,(body)=>{
      this.xzg.showToast('top', body.msg);
      console.log(body)
      this.goods = body.data;
    },true);

  }

  //1拍照,0从图库选择
  getPicture(type) {
    let options = {
      targetWidth: 800,
      targetHeight: 800
    };
    if (type == 1) {
      this.nativeService.getPictureByCamera(options).then(imageBase64 => {
        this.getPictureSuccess(imageBase64);
      });
    } else {
      this.nativeService.getPictureByPhotoLibrary(options).then(imageBase64 => {
        this.getPictureSuccess(imageBase64);
      });
    }
  }

  private getPictureSuccess(imageBase64) {
    this.goods.thumb = 'data:image/jpeg;base64,' + imageBase64;
  }
  //扫描
  scanGoods() {
    this.nativeService.scan().then(barcodeData => {
      this.goods.sn = barcodeData;
    });
  }

  //检查商品信息填写是否完整
  checkInfoOver(): boolean {
    console.log(this.goods);
    if(this.goods.name == ""){
      this.xzg.showToast('top', "商品名称必须填写");
      return false;
    }

    if(parseInt(this.goods.cost_price) <= 0 ||
      this.goods.cost_price == "" ||
      this.goods.cost_price+"" === NaN+""){
      this.xzg.showToast('top', "进价必须大于0");
      return false;
    }
    if(parseInt(this.goods.price) <= 0 ||
      this.goods.price == "" ||
      this.goods.price+"" === NaN+""){
      this.xzg.showToast('top', "售价必须大于0");
      return false;
    }
    if(this.goods.count == '' ||
      parseInt(this.goods.count) <= 0 ||
      this.goods.count+"" === NaN+""){
      this.xzg.showToast('top', "数量必须大于0");
      return false;
    }
    return true;
  }

  //保存
  saveGoods() {
    if(this.goods.id){
      this.updateGoods();
    }else {
      this.createGoods();
    }
  }

  //新增商品
  createGoods() {
    if (this.checkInfoOver()) {
      let param = this.goods
      this.xzg.httpPost(this.xzg.api.ApiGoodsaddGoods, param,(body)=>{
        this.xzg.showToast('top', body.msg);
        this.navCtrl.pop();
      },true);
    }
  }

  //修改商品
  updateGoods() {
    if (this.checkInfoOver()) {
      let param = this.goods
      this.xzg.httpPost(this.xzg.api.ApiGoodseditGoods, param,(body)=>{
        this.xzg.showToast('top', body.msg);
        this.navCtrl.pop();
      },true);
    }
  }

  //点击图片选择上传方式
  selectImage() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '上传图片',
      buttons: [
        {
          text: '拍照上传',
          icon:'camera',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.getPicture(1);
          }
        },{
          text: '从相机选择',
          icon:'image',
          // role: 'destructive',
          handler: () => {
            console.log('Archive clicked');
            this.getPicture(0);
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }



  //取消更新或者创建商品
  cancelSaveGoods() {
      let confirm = this.alertCtrl.create({
        title: '提示',
        message: '你正在'+this.title,
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



}

