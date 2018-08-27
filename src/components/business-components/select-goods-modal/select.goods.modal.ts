import { Component } from '@angular/core';
import { Platform ,NavParams,ViewController,IonicPage,ToastController} from 'ionic-angular';
import { Xzg } from '../../../providers/util/xzg';
@IonicPage()
@Component({
  selector: 'select-goods-modal',
  templateUrl: 'select.goods.modal.html'
})
export class SelectGoodsModalPage {
  //总数
  total:any;
  characters:any = [];
  list:any=[];
  showIuput:boolean;
  goodsName:any;
  //当前页码
  cPage:any = 1;
  pagesize:any = 10;
  constructor(
    public platform: Platform,
    public toastCtrl: ToastController,
    public params: NavParams,
    public xzg: Xzg,
    public viewCtrl: ViewController
  ) {
    //收到传入的数据
    console.log(this.params.data)
    if(this.params.data.type == 'CODE'){
      this.showIuput = false;
      let param = {
        sn: this.params.data.qcode
      }
      let that = this;
      this.xzg.httpGet(this.xzg.api.ApiGoodsscanCode, param, function (body) {
          that.list.push(body.data) ;
      },true);
    }else {
      this.showIuput = true;
      this.goodsName = this.params.data.goodsName;
      this.getGoodsList(1,this.goodsName);
    }
  }

  //下拉刷新
  doInfinite(infiniteScroll) {
    setTimeout(() => {
      if(this.cPage * 10 - 10 >= this.total){
        this.xzg.showToast('top',"已经加载完了");
        infiniteScroll.complete();
        return false;
      }else {
        this.getGoodsList(this.cPage,this.goodsName);
        infiniteScroll.complete();
      }
    }, 500);
  }

  getGoodsList(page,name){
    if(page == 1){
      this.list = [];
    }
    this.cPage = page;
    this.cPage++;
    let param = {
      pagesize: this.pagesize,
      p: page,
      name:name
    }
    let that = this;
    this.xzg.httpGet(this.xzg.api.ApiGoodsgetGoodsList, param, (body)=>{
      this.list = this.list.concat(body.data[0].goodslist);
      this.total = body.data[0].total;
    },true);
  }
  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }

  //选择商品
  selectGoods(good){
    console.log(good)
    if(good.selected){
      good.selected = false;
    }else {
      good.selected = true;
    }
  }
  searchItems(){
    console.log(this.goodsName)
    this.getGoodsList(1,this.goodsName);
  }
  dismiss() {
    this.characters = [];
    if(this.list.length > 0){
      for(let i=0;i<this.list.length;i++){
        if(this.list[i].selected){
          this.characters.push(this.list[i])
        }
      }
    }
    //这是从模态框传回的数据
    this.viewCtrl.dismiss( this.characters );
  }
  dismissCancel(){
    this.viewCtrl.dismiss( []);
  }

}

