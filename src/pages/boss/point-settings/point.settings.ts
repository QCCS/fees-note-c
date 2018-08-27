import { Component } from '@angular/core';
import { NavController,IonicPage } from 'ionic-angular';
import { Xzg } from '../../../providers/util/xzg';
@IonicPage()
@Component({
  selector: 'page-point-settings',
  templateUrl: 'point.settings.html'
})
export class PointSettingsPage {

  point: any = {
    "consume_score_rate": 111,
    "extend_score":22,
    "default_score":3333,
    "referral_consume_score":0.1,
    "disabled":true
  };
  constructor(public navCtrl: NavController,
              public xzg: Xzg) {
    this.getPoint();
  }

  ionViewDidEnter(){

  }

  getPoint(){
    let param = {};
    this.xzg.httpGet(this.xzg.api.ApiMemberConfiggetMemberConfig, param,(body)=>{
      this.point = body.data;
      this.point.disabled = true;
    },true);
  }

  savePoint(point){
    let param = {
      "consume_score_rate": point.consume_score_rate,
      "extend_score":point.extend_score,
      "default_score":point.default_score,
      "referral_consume_score":point.referral_consume_score
    }
    this.xzg.httpPostBody(this.xzg.api.ApiMemberConfigsetMemberConfig, param,(body)=>{
      this.point.disabled = true;
    },true);

  }
  updatePoint(point){
    point.disabled = false;
  }
}

