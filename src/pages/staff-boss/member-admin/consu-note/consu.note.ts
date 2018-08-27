import { Component } from '@angular/core';
import { NavController ,IonicPage,NavParams,AlertController,ActionSheetController} from 'ionic-angular';
import { Xzg } from '../../../../providers/util/xzg';
@IonicPage()
@Component({
  selector: 'page-consu-note',
  templateUrl: 'consu.note.html'
})
export class consuNotePage {
  //todo
  //还需要做翻页
  consuType: any = 'consu';
  member_id: any;

  orderPage: any = 1;
  orderList: any = [];
  orderTotal: any = 0;

  rechargePage: any = 1;
  rechargeList: any = [];
  rechargeTotal: any = 0;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public xzg: Xzg,
              public alertCtrl: AlertController,
              public actionSheetCtrl: ActionSheetController) {
    console.log(this.navParams);
    this.member_id = this.navParams.get("member_id");

    this.consuTypeChange(1);
  }


  //消费记录
  doInfiniteConsu(infiniteScroll) {
    setTimeout(() => {
      if(this.orderPage * 10 - 10 >= this.orderTotal){
        this.xzg.showToast('top',"已经加载完了");
        infiniteScroll.complete();
        return false;
      }else {
        this.getMemberOrderList(this.orderPage,this.member_id);
        infiniteScroll.complete();
      }
    }, 500);
  }

  //充值记录
  doInfiniteConsuAdd(infiniteScroll) {
    setTimeout(() => {
      if(this.rechargePage * 10 - 10 >= this.rechargeTotal){
        this.xzg.showToast('top',"已经加载完了");
        infiniteScroll.complete();
        return false;
      }else {
        this.getMemberRechargeList(this.rechargePage,this.member_id);
        infiniteScroll.complete();
      }
    }, 500);
  }

  //消费记录
  getMemberOrderList(page,member_id){
    if(page == 1){
      this.orderList = [];
    }
    this.orderPage = page;
    this.orderPage++;
    // start_time=150293838 end_time=150293838参数可选
    let param = {
      pagesize: 10,
      p: page,
      member_id: member_id
    }
    this.xzg.httpGet(this.xzg.api.ApiMembergetMemberOrderList, param,(body)=>{
      console.log(body)

      this.orderList = this.orderList.concat(body.data[0].orderlist);
      this.orderTotal = body.data[0].total;
    },true);
  }

  //充值记录
  getMemberRechargeList(page,member_id){
    if(page == 1){
      this.rechargeList = [];
    }
    this.rechargePage = page;
    this.rechargePage ++;
    // start_time=150293838 end_time=150293838参数可选
    let param = {
      pagesize: 10,
      p: page,
      member_id: member_id
    }
    this.xzg.httpGet(this.xzg.api.ApiMembergetMemberRechargeList, param,(body)=>{
      console.log(body)
      this.rechargeList = this.rechargeList.concat(body.data[0].rechargelist);
      this.rechargeTotal = body.data[0].total;
    },true);
  }

  consuTypeChange($event){
    if(this.consuType == "consu"){
      this.getMemberOrderList(1, this.member_id);
    }else if(this.consuType == "consuAdd"){
      this.getMemberRechargeList(1, this.member_id);
    }
  }

}

