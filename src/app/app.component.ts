import { Component, ViewChild } from '@angular/core';
import { Nav, Platform ,Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppState } from './app.global';
import { Localstorage } from '../providers/util/localstorage';
import { Xzg } from '../providers/util/xzg';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
  templateUrl: 'app.html',
  providers: [TranslateService]
})

//容器组件
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  //menu是否可用，必须登陆f
  menuEnabled: boolean = false;
  menuSwipeEnabled:boolean = true;
  //登陆页
  // loginPage: any = 'LoginPage';
  //设置首页
  // rootPage: any = 'TabWrapPage';

  pages: Array<{ title: string, component: any, active: boolean, icon: string }>;

  state: any;
  account:any;
  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public events: Events,
              public xzg: Xzg,
              public localstorage: Localstorage,
              public splashscreen: SplashScreen,
              public translate: TranslateService,
              public global: AppState) {


    this.account = {};
    this.account.username = '';
    this.account.group_name = '';
    this.account.mobile = '';
    this.account.avatar = '';
    //初始化app
    this.initializeApp();


    events.subscribe('meun:enable', (msg) => {
      this.menuSwipeEnabled = msg;
    });

    //监听登录
    events.subscribe('user:login', (isok, time) => {
      this.menuEnabled = true;
      let that = this;
      setTimeout(function () {
        that.getAccount();
      },500)

    });

    //监听退出事件
    events.subscribe('user:logout', (isok, time) => {
      this.menuEnabled = false;
    });

    //监听挤掉事件
    events.subscribe('user:200003', (msg) => {
      this.menuEnabled = false;
      this.localstorage.clearStorage();
      this.nav.setRoot('LoginPage',{
        msg:msg
      });
    });

    //侧边导航与主页
    this.pages = [
      { title: 'side_meun.TabWrapPage', component: 'TabWrapPage', active: true, icon: 'home' },
      { title: 'side_meun.AccoutPage', component: 'AccoutPage', active: true, icon: 'settings' },
      { title: 'side_meun.AboutPage', component: 'AboutPage', active: false, icon: 'albums' },
      { title: 'side_meun.HelpFeedbackPage', component: 'HelpFeedbackPage', active: false, icon: 'help-buoy' },
      { title: 'side_meun.SoftPage', component: 'SoftPage', active: false, icon: 'construct' },
    ];


    //获取token，判断是否登陆：
    this.localstorage.get('token').then(token=>{
      console.log('token: '+ token);
      if(token){
        this.nav.setRoot('TabWrapPage');
        this.menuEnabled = true;
      }else {
        this.nav.setRoot('LoginPage');
        this.menuEnabled = false;
      }
    });
    //获取本地账户信息
    this.localstorage.get('account').then(account=>{
      if(account){
        this.account = account;
      }
    });
  }


  //获取用户信息
  getAccount(){
    this.xzg.httpGet(this.xzg.api.ApiConfiggetAccount, {token:"token"},(body)=>{
        this.account = body.data;
        this.localstorage.set("account",body.data);
    },true);
  }



  initializeApp() {
    this.platform.ready().then(() => {
      // 主题
      this.global.set('theme', '');
      this.statusBar.styleDefault();
      // 启动页
      this.splashscreen.hide();
      // var userLang = navigator.language.split('-')[0];
      // userLang = /(en|es)/gi.test(userLang) ? userLang : 'zh_cn';

      this.translate.setDefaultLang('zh_cn');
      // this.translate.use(userLang);
    });
  }


  //TODO
  //多语言设置测试
  getLangTest(){
    this.translate.get('side_meun.TabWrapPage').subscribe(
      value => {
        let alertTitle = value;
        console.log(alertTitle);
      }
    )
  }

  openPage(page) {
    console.log("设置页面");
    if(page.component == 'TabWrapPage'){
      this.nav.setRoot(page.component);
    }else {
      this.nav.push(page.component);
      // this.navCtrl.push(page.component);
    }
  }

}
