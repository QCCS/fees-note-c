import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Localstorage } from '../../providers/util/localstorage';
//如果要多语言，每一个模块都需要导入多语言模块
@IonicPage()
@Component({
  selector: 'page-tab-wrap',
  templateUrl: 'tab.wrap.html',
  providers: [TranslateService]
})
export class TabWrapPage {

  tab1 = 'TabHome';
  tab2 = 'TabMy';
  tab3 = 'TabManage';
  isAdmin :boolean;
  home :any;
  me :any;
  manage :any;
  constructor( public translate: TranslateService,public localstorage: Localstorage) {
    this.translate.use('en');

    this.home = '首页';
    this.me = '我的';
    this.manage = '管理';

    //人员身份
    this.localstorage.get('type').then(type=>{
      console.log('type: '+ type);
      if(type == '0'){
        this.isAdmin = true;
      }else {
        this.isAdmin = false;
      }
    });

  }
}


