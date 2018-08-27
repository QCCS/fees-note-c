import {LoadingController, AlertController, ToastController, Events} from 'ionic-angular';
import {Injectable} from '@angular/core';
import {Http, Request, RequestMethod, RequestOptions, Headers} from '@angular/http';
import {Localstorage} from './localstorage';
import 'rxjs/add/operator/toPromise';
import {domain} from '../constants';
import {API} from '../api';
import {NativeService} from "../../providers/NativeService";
@Injectable()
export class Xzg {
  api = API;
  refresh_token: any;
  mobile: any;
  token: any;
  expires: any = null;

  loading: any;
  constructor(public http: Http,
              public events: Events,
              private nativeService: NativeService,
              public loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              public localstorage: Localstorage) {

              this.setRequestToken();
              //监听登录
              events.subscribe('user:login', (isok, time) => {
                setTimeout(() => {
                  this.setRequestToken();
                }, 400)
              });

  }
  //设置请求需要的token
  setRequestToken() {
    this.localstorage.get('token').then(token => {
      this.token = token;
    });
    this.localstorage.get('refresh_token').then(refresh_token => {
      this.refresh_token = refresh_token;
    });
    this.localstorage.get('mobile').then(mobile => {
      this.mobile = mobile;
    });
    this.localstorage.get('expires').then(expires => {
      this.expires = expires;
    });
  }

  //判断是否为空
  isEmpty(obj) {
    for (let key in obj) {
      return false;
    }
    return true;
  }

  //post请求，form表单请求，参数转换
  encodePost(params) {
    //token一直都需要
    var str = '';
    for (var key in params) {
      var value = params[key];
      str += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
    }
    str = str.substring(0, str.length - 1);
    return str;
  }

  //get请求，参数转换
  encodeGet(params) {
    params.token = this.token;
    var str = '';
    for (var key in params) {
      var value = params[key];
      str += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
    }
    str = '?' + str.substring(0, str.length - 1);
    return str;
  }

  //请求之前判断过期
  isRefreshToken() {
    let fs = (new Date()).getTime();
    // 提前30秒
    if (this.expires && fs + 1000 * 30 >= this.expires) {
      return true;
    } else {
      return false;
    }
  }

  //刷新token
  refreshToken(url, params, callback, loader: boolean = false,type){

    this.loading = this.loadingCtrl.create({});
    if (loader) {
      this.loading.present();
    }
    //error token
    let o = {
      refresh_token: this.refresh_token
    }
    this.http.get(domain + this.api.ApiLoginrefreshToken + this.encodeGet(o))
      .toPromise()
      .then(res => {
        var d = res.json();
        if (loader && this.loading) {
          this.loading.dismiss();
          this.loading = null;
        }
        this.handleRefreshTokem(d);
        if (d.status == 0) {
          if(type == "GET"){
            this.myGet(url, params, callback, loader);
          }else if(type == "POST"){
            this.myPost(url, params, callback, loader);
          }else {
            this.myPostBody(url, params, callback, loader);
          }
        }
      })
      .catch(error => {
        if (loader && this.loading) {
          this.loading.dismiss();
          this.loading = null;
        }
        this.handleError(error);
      });
  };
  //get请求入口
  httpGet(url, params, callback, loader: boolean = false) {
    //如果token已经过期
    if (this.isRefreshToken()) {
      this.refreshToken(url, params, callback, loader,"GET");
    } else {
      this.myGet(url, params, callback, loader);
    }
  }
  //get请求:token在参数转换的时候，默认就加上
  private myGet(url, params, callback, loader: boolean = false) {
    if (loader && this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
    this.loading = this.loadingCtrl.create({});
    if (loader) {
      this.loading.present();
    }
    this.http.get(domain + url + this.encodeGet(params))
      .toPromise()
      .then(res => {
        var d = res.json();
        if (loader && this.loading) {
          this.loading.dismiss();
          this.loading = null;
        }
        if (d.status === 0) {
          callback(d == null ? "[]" : d);
        } else {
          this.handleSucess(d);
        }
      })
      .catch(error => {
        if (loader && this.loading) {
          this.loading.dismiss();
          this.loading = null;
        }
        this.handleError(error);
      });
  }
  //POST请求入口
  httpPost(url, params, callback, loader: boolean = false) {
    //如果是登陆
    if (url == this.api.ApiLoginlogin) {
      this.myPost(url, params, callback, loader);
      return;
    }
    if (this.isRefreshToken()) {
      this.refreshToken(url, params, callback, loader,"POST");
    } else {
      this.myPost(url, params, callback, loader);
    }
  }
  //form表单形式的post
  private myPost(url, params, callback, loader: boolean = false) {
    if (loader && this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
    this.loading = this.loadingCtrl.create({});
    if (loader) {
      this.loading.present();
    }
    var headers = new Headers();
    headers.append("Content-Type", 'application/x-www-form-urlencoded');
    var requestoptions = new RequestOptions({
      url: domain + url+"?token="+this.token,
      method: RequestMethod.Post,
      headers: headers,
      body: this.encodePost(params)
    })

    this.http.request(new Request(requestoptions))
      .toPromise()
      .then(res => {
        var d = res.json();
        if (loader && this.loading) {
          this.loading.dismiss();
          this.loading = null;
        }
        if (d.status === 0) {
          callback(d == null ? "[]" : d);
        } else {
          this.handleSucess(d);
        }
      }).catch(error => {
      if (loader && this.loading) {
        this.loading.dismiss();
        this.loading = null;
      }
        this.handleError(error);
    });
  }

  //发送post，接受body
  httpPostBody(url, params, callback, loader: boolean = false) {
    if (this.isRefreshToken()) {
      this.refreshToken(url, params, callback, loader,"POST_BODY");
    } else {
      this.myPostBody(url, params, callback, loader);
    }
  }
  //post发送body
  private myPostBody(url, params, callback, loader: boolean = false) {
    this.loading = this.loadingCtrl.create({});//这个是异步的，当dismiss的时候，可能还没创建
    if (loader) {
      this.loading.present();
    }
    this.http.post(domain + url+"?token="+this.token, params)
      .toPromise()
      .then(res => {
        var d = res.json();
        if (loader && this.loading) {
          this.loading.dismiss();
          this.loading = null;
        }
        if (d.status === 0) {
          callback(d == null ? "[]" : d);
        } else {
          this.handleSucess(d);
        }
      }).catch(error => {
      if (loader && this.loading) {
        this.loading.dismiss();
        this.loading = null;
      }
      this.handleError(error);
    });
  }
  //对不理想的响应进行处理
  private handleSucess(d) {
    if (d.status === 200003 || d.status == 200004) {
      this.toast(d.status + d.msg);
      this.events.publish('user:200003', '账号在其他设备上登录了');
    }else {
      this.toast(d.status + d.msg);
    }
  }
  //请求发送错误的处理
  private handleError(error: Response | any) {
    let msg = '';
    if (error.status == 0) {
      msg = '请检查网络:status0';
    }
    if (error.status == 400) {
      msg = '请求无效(code：404)';
      console.log('请检查参数类型是否匹配');
    }
    if (error.status == 404) {
      msg = '请求资源不存在(code：404)';
      console.error(msg + '，请检查路径是否正确');
    }
    if (error.status == 500) {
      msg = '服务器发生错误(code：500)';
      console.error(msg + '，请检查路径是否正确');
    }
    if (msg != '') {
      this.toast(msg);
    }
  }
  //刷新token处理
  private handleRefreshTokem(body) {
    if (body.status == 200003) {
      this.events.publish('user:200003', '账号在其他设备上登录了');
    } else if (body.status == 0) {
      let data = body.data;
      this.setNewToken(data);
    } else {
      this.alert(body.msg);
    }
  }
  //刷新token之后，设置
  setNewToken(data) {
    this.token = data.token;
    this.refresh_token = data.refresh_token;
    let fs_r = (new Date()).getTime();
    // 过期时间
    let expires = fs_r + data.expires*1000;

    this.expires = expires;
    //error token的情况下，刷新
    this.localstorage.set('expires',expires);
    this.localstorage.set('refresh_token', data.refresh_token);
    this.localstorage.set('token_deadline', data.token_deadline);
    this.localstorage.set('token', data.token);
    //需要请求上一次的请求
  }
  alert(message, callback?) {
    if (callback) {
      let alert = this.alertCtrl.create({
        title: '提示',
        message: message,
        buttons: [{
          text: "确定",
          handler: data => {
            callback();
          }
        }]
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: '提示',
        message: message,
        buttons: ["确定"]
      });
      alert.present();
    }
  }
  toast(message, callback?) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: 'top'
    });
    toast.present();
    if (callback) {
      callback();
    }
  }

  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: position
    });
    toast.present(toast);
  }

}
