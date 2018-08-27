import { Component } from '@angular/core';
import { NavParams,IonicPage, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.html'
})
export class ScheduleFilterPage {

  point:any = false;
  sale:any = false;

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    //收到传入的数据
    console.log(this.params.data)
    if(this.params.data.goodType == 3){
      this.point = false;
      this.sale = true;
    }if(this.params.data.goodType == 2){
      this.point = true;
      this.sale = false;
    }else {
      this.point = true;
      this.sale = true;
    }


  }

  resetFilters() {
    this.point = true;
    this.sale = true;
  }

  applyFilters() {
    if(!this.point && this.sale){
      this.viewCtrl.dismiss(3);
    }else if(this.point && !this.sale){
      this.viewCtrl.dismiss(2);
    }else {
      this.viewCtrl.dismiss(1);
    }
  }

  dismiss() {
    // dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    // this.viewCtrl.dismiss(data);
    this.viewCtrl.dismiss(this.params.data.goodType);
  }
}
