import { Component } from '@angular/core';
import { NavController ,Platform,IonicPage} from 'ionic-angular';
import { Xzg } from '../../../providers/util/xzg';
@IonicPage()
@Component({
  selector: 'page-my-achievement',
  templateUrl: 'my.achievement.html'
})
export class MyAchievementPage {
  during: string = "day";
  dayOption:any;
  dayOptionLine:any;
  weekOptionLine:any;
  weekOption:any;
  monthOption:any;
  monthOptionLine:any;

  dayAchieve:any = {
    receive_money:"0",
    order_count:"0",
    deduct:"0",
    member_count:"0"
  };
  weekAchieve:any =  {
    receive_money:"0",
    order_count:"0",
    deduct:"0",
    member_count:"0"
  };
  monthAchieve:any =  {
    receive_money:"0",
    order_count:"0",
    deduct:"0",
    member_count:"0"
  };

  isAndroid: boolean = false;

  // data7 = [
  //   ["2000-06-25",71],["2000-06-26",106],["2000-06-27",84],["2000-06-28",93],
  //   ["2000-06-29",85],["2000-06-30",73],["2000-07-01",83]
  //   ];
  constructor(public navCtrl: NavController,
              public xzg: Xzg,
              platform: Platform) {
    this.isAndroid = platform.is('android');
  }

  //进入页面调用最新数据
  ionViewDidEnter(){
    this.getMyReport("day");
    this.getMyChart("day");

    this.getMyReport("week");
    this.getMyChart("week");

    this.getMyReport("month");
    this.getMyChart("month");
  }
  setDayAchieve(data){
    this.dayAchieve = data;
  };
  setWeekAchieve(data){
    this.weekAchieve = data;
  };
  setMonthAchieve(data){
    this.monthAchieve = data;
  };

  setDayData(){
    console.log(this.dayData)
    // this.dayData = [
    //   ["2000-06-25","0.00"],["2000-06-26","0.00"],["2000-06-27","0.00"],["2000-06-28","1111.00"],
    //   ["2000-06-29","0.00"],["2000-06-30","222.00"],["2000-07-01","0.00"]
    //   ];
    let dataList = this.dayData.map(function (item,index) {
      return item[0];
      // return index+1;
    });
    let valueList = this.dayData.map(function (item) {
      return parseInt(item[1]) + 10;
    });
    this.dayOption = {
      title: [{
        left: 'center',
        text: '最近30天柱状图'
      }],
      color: ['#3398DB'],
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          data : dataList,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'销售金额',
          type:'bar',
          barWidth: '60%',
          data:valueList
        }
      ]
    };
    this.dayOptionLine = {
      visualMap: [{
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: 0,
        max: 400
      }],

      title: [{
        left: 'center',
        text: '最近30天折线图'
      }],
      tooltip: {
        trigger: 'axis'
      },
      xAxis: [{
        data: dataList
      }],
      yAxis: [{
        // offset:-20,
        splitLine: {show: false}
      }],
      grid: [{
        bottom: '20%',
        left:'15%'
      }],
      series: [{
        type: 'line',
        showSymbol: false,
        data: valueList
      }]
    }
  }
  setWeekData(){
    console.log(this.weekData)
    //最近6周的数据：每一条数据是周的总量
    let dataList = this.weekData.map(function (item,index) {
      return item[0];
    });
    let valueList = this.weekData.map(function (item) {
      return item[1];
    });
    this.weekOption = {
      title: [{
        left: 'center',
        text: '最近6周柱状图'
      }],
      color: ['#3398DB'],
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          data : dataList,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'销售金额',
          type:'bar',
          barWidth: '60%',
          data:valueList
        }
      ]
    };
    this.weekOptionLine = {
      visualMap: [{
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: 0,
        max: 400
      }],

      title: [{
        left: 'center',
        text: '最近6周折线图'
      }],
      tooltip: {
        trigger: 'axis'
      },
      xAxis: [{
        data: dataList
      }],
      yAxis: [{
        // offset:-20,
        splitLine: {show: false}
      }],
      grid: [{
        bottom: '20%',
        left:'15%'
      }],
      series: [{
        type: 'line',
        showSymbol: false,
        data: valueList
      }]
    }
  }
  setMonthData(){
    console.log(this.monthData)
    //最近7个月的数据：每一条数据是月的总量
    let dataList = this.monthData.map(function (item,index) {
      return item[0];
    });
    let valueList = this.monthData.map(function (item) {
      return item[1];
    });
    this.monthOption = {
      title: [{
        left: 'center',
        text: '最近6个月柱状图'
      }],
      color: ['#3398DB'],
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          data : dataList,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'销售金额',
          type:'bar',
          barWidth: '60%',
          data:valueList
        }
      ]
    };

    this.monthOptionLine = {
      visualMap: [{
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: 0,
        max: 400
      }],

      title: [{
        left: 'center',
        text: '最近6个月折线图'
      }],
      tooltip: {
        trigger: 'axis'
      },
      xAxis: [{
        data: dataList
      }],
      yAxis: [{
        // offset:-20,
        splitLine: {show: false}
      }],
      grid: [{
        bottom: '20%',
        left:'15%'
      }],
      series: [{
        type: 'line',
        showSymbol: false,
        data: valueList
      }]
    }
  }

  // 我的业绩
  getMyReport(type){
    let param = {
      type:type
    }
    this.xzg.httpGet(this.xzg.api.ApiReportgetMyReport, param,(body)=>{
      if(type == "day"){
        this.setDayAchieve(body.data);
      }else if(type == "week"){
        this.setWeekAchieve(body.data);
      }else if(type == "month"){
        this.setMonthAchieve(body.data);
      }
    });
  }
  //get获取我的业绩图表
  getMyChart(type){
    let param = {
      type:type
    }
    this.xzg.httpGet(this.xzg.api.ApiReportgetMyChart, param,(body)=>{
      if(type == "day"){
        this.dayData = body.data?body.data:[];
        this.setDayData();
      }else if(type == "week"){
        this.weekData =body.data?body.data:[];
        this.setWeekData();
      }else if(type == "month"){
        this.monthData =body.data?body.data:[];
        this.setMonthData();
      }
    });
  }

}

