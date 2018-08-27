import { Component } from '@angular/core';
import { NavController,IonicPage } from 'ionic-angular';
import { Xzg } from '../../../providers/util/xzg';
@IonicPage()
@Component({
  selector: 'page-point-goods',
  templateUrl: 'point.goods.html'
})
export class PointGoodsPage {

  list:any[]=[];
  //总数
  total:any;
  //页码
  cPage:any = 1;
  //关键字
  myInputSearch:any='';
  //$order
  order:any = '0';//1
  constructor(public navCtrl: NavController,
              public xzg: Xzg,) {

  }

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
  onInputSearchbar(){
    this.cPage = 1;
    this.getGoodsList(this.cPage,this.myInputSearch);
  }
  ionViewDidEnter(){
    this.getGoodsList(1,this.myInputSearch);
  }

  //showCancelButton为true才可以点击
  onCancelSearchbar(){
    console.log(this.myInputSearch)
  }
  goToGoodsDetail(good) {
   this.navCtrl.push("PointGoodsDetailPage",{
     item: good.id
   });
  }

  getGoodsList(page,name){
    if(page == 1){
      this.list = [];
    }
    this.cPage = page;
    this.cPage++;
    let param = {
      pagesize: 10,
      p: page,
      name: name,
      order:this.order
    }
    this.xzg.httpGet(this.xzg.api.ApiGoodsgetGoodsListForExchange, param,(body)=>{
      this.list = this.list.concat(body.data[0].goodslist);
      this.total = body.data[0].total;
    },true);
  }
}

