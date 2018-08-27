import { Component } from '@angular/core';
import { NavController,IonicPage ,ToastController,NavParams,ModalController,
  AlertController} from 'ionic-angular';
import { Xzg } from '../../../providers/util/xzg';

@IonicPage()
@Component({
  selector: 'page-goods-admin',
  templateUrl: 'goods.admin.html'
})
export class GoodsAdminPage {

  //商品列表
  list:any[]=[];
  //总数
  total:any;
  //当前页码
  cPage:any = 1;
  pagesize:any = 10;
  //关键字
  myInputSearch:any='';
  //排序方式0时间降序，1升序
  order:any = '0';//1
  //商品类型
  goodType:any = 1;//3销售，1积分与销售，2积分


  constructor(public navCtrl: NavController,
              public xzg: Xzg,
              public alertCtrl: AlertController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public toastCtrl: ToastController) {

  }

  //过滤之后传回一个参数
  presentFilter() {
    let modal = this.modalCtrl.create('ScheduleFilterPage',
      {goodType:this.goodType});
    modal.present();
    modal.onWillDismiss((data: any[]) => {
      if (data) {
        //接收过滤之后传回的参数
        this.goodType = data;
        this.getGoodsList(1,this.myInputSearch);
      }
    });
  }

  //下拉刷新
  doInfinite(infiniteScroll) {
    setTimeout(() => {
      if(this.cPage * 10 - 10 >= this.total){
        this.xzg.showToast('top',"已经加载完了");
        infiniteScroll.complete();
        return false;
      }else {
        this.getGoodsList(this.cPage,this.myInputSearch);
        infiniteScroll.complete();
      }
    }, 500);
  }
  //搜索
  onInputSearchbar(){
    this.cPage = 1;
    this.getGoodsList(this.cPage,this.myInputSearch);
  }

  //showCancelButton为true才可以点击
  onCancelSearchbar(){
    console.log(this.myInputSearch)
  }

  popPage(){
    console.log('popPage');
  }

  //钩子函数
  ionViewDidLoad(){
    console.log('触发ionViewDidLoad');
  }

  ionViewWillEnter(){
    console.log('触发ionViewWillEnter');
  }

  //进入页面调用最新数据
  ionViewDidEnter(){
      this.getGoodsList(1,this.myInputSearch);
  }

  ionViewWillLeave(){
    console.log('触发ionViewWillLeave');
  }

  ionViewDidLeave(){
    console.log('触发ionViewDidLeave');
  }

  ionViewWillUnload(){
    console.log('触发ionViewWillUnload');
  }


  orderByTime(val){
    this.getGoodsList(1,this.myInputSearch);
  }

  //获取商品列表
  getGoodsList(page,name){
    if(page == 1){
      this.list = [];
    }
    this.cPage = page;
    this.cPage++;
    let param = {
      pagesize: this.pagesize,
      p: page,
      name: name,
      order:this.order
    }
    //积分商品
    if(this.goodType == 2){
      this.xzg.httpGet(this.xzg.api.ApiGoodsgetGoodsListForExchange, param,(body)=>{
        this.list = this.list.concat(body.data[0].goodslist);
        this.total = body.data[0].total;
      },true);
    }else if(this.goodType == 1){
      //复合
      this.xzg.httpGet(this.xzg.api.ApiGoodsgetGoodsList, param,(body)=>{
        this.list = this.list.concat(body.data[0].goodslist);
        this.total = body.data[0].total;
      },true);
    }else {
      //消费商品
      this.xzg.httpGet(this.xzg.api.ApiGoodsgetGoodsListForSale, param,(body)=>{
        this.list = this.list.concat(body.data[0].goodslist);
        this.total = body.data[0].total;
      },true);
    }


  }

  //删除
  deleteGood(good){
    let param = {
      id: good.id
    }
    let confirm = this.alertCtrl.create({
      title: '提示',
      message: '你确定要删除此商品吗？',
      buttons: [
        {
          text: '取消',
          handler: () => {
          }
        },
        {
          text: '确定',
          handler: () => {
            this.xzg.httpGet(this.xzg.api.ApiGoodsdelGoods, param,(body)=>{
              this.getGoodsList(1,this.myInputSearch);
            },true);
          }
        }
      ]
    });
    confirm.present();
  }

  //创建
  addGoodsDetail() {
    this.navCtrl.push('GoodsDetailPage',{action:"create"});
  }
  //查看详情
  goToGoodsDetail(good) {
    this.navCtrl.push('GoodsDetailPage',{
      item: good.id,
      action: "update"
    });
  }

}

