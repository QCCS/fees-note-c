import { Component } from '@angular/core';
import { NavController ,IonicPage,NavParams} from 'ionic-angular';
import { Xzg } from '../../../providers/util/xzg';

@IonicPage()
@Component({
  selector: 'page-member-admin',
  templateUrl: 'member.admin.html'
})
export class MemberAdminPage {

  list:any[]=[];
  //总数
  total:any;
  //页码
  cPage:any = 1;
  //关键字
  myInputSearch:any='';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public xzg: Xzg) {
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      if(this.cPage * 10 - 10 >= this.total){
        this.xzg.showToast('top',"已经加载完了");
        infiniteScroll.complete();
        return false;
      }else {
        this.getMemberList(this.cPage,this.myInputSearch);
        infiniteScroll.complete();
      }
    }, 500);
  }
  onInputSearchbar(){
    this.cPage = 1;
    this.getMemberList(this.cPage,this.myInputSearch);
  }


  ionViewDidEnter(){
    this.getMemberList(1,this.myInputSearch);
  }

  getMemberList(page,mobile){
    if(page == 1){
      this.list = [];
    }
    this.cPage = page;
    this.cPage++;
    // start_time=150293838 end_time=150293838参数可选
    let param = {
      pagesize: 10,
      p: page,
      mobile: mobile
    }
    this.xzg.httpGet(this.xzg.api.ApiMembergetMemberList, param,(body)=>{
      this.list = this.list.concat(body.data[0].memberlist);
      this.total = body.data[0].total;
    },true);
  }


  //创建
  addMemberDetail() {
    this.navCtrl.push('MemberDetailPage',{action:"create"});
  }
  //查看详情
  goToMemberDetail(member) {
      this.navCtrl.push('MemberDetailPage',
        {
          item: member.id,
          action: "update"
        });
  }


  //查看消费记录
  consuNote(member){
    this.navCtrl.push('consuNotePage',
      {
        member_id: member.id
      });
  }


}

