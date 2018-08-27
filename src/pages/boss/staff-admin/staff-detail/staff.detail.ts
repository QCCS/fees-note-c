import { Component } from '@angular/core';
import { NavController ,IonicPage,NavParams,ToastController,AlertController,
  ActionSheetController} from 'ionic-angular';
import {NativeService} from "../../../../providers/NativeService";
import {Localstorage} from "../../../../providers/util/localstorage";
import { Xzg } from '../../../../providers/util/xzg';
import { Md5 } from 'ts-md5/dist/md5';
@IonicPage()
@Component({
  selector: 'page-staff-detail',
  templateUrl: 'staff.detail.html'
})
export class StaffDetailPage {
  public event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }
  item: any;
  //是否是新增的标志
  action: string;
  //页面的标题
  title: string;
  //员工对象
  user: any = {
    "username": "",//名称
    "avatar":"",//头像
    "password": '',//密码
    "mobile": ""//电话
  };

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public navParams: NavParams,
              public xzg: Xzg,
              public actionSheetCtrl: ActionSheetController,
              public localstorage: Localstorage,
              private nativeService: NativeService) {


    this.action = this.navParams.get("action");
    if (this.action == "create") {
      this.title = "新增员工";
    } else if (this.action == "update") {
      this.title = "编辑员工";
    } else {
      this.title = "新增员工";
    }

    this.item = this.navParams.get("item");
    if(this.item){
      this.getUser(this.item);
    }else {
      console.log("新增")
      this.user = this.user;
    }

  }


  getUser(id){
    let param = {
      id: id
    };
    this.xzg.httpGet(this.xzg.api.ApiUsergetUser, param,(body)=>{
      this.showToast('top', body.msg);
      this.user = body.data;
    },true);

  }


  //1拍照,0从图库选择
  getPicture(type) {
    let options = {
      targetWidth: 800,
      targetHeight: 800
    };
    if (type == 1) {
      this.nativeService.getPictureByCamera(options).then(imageBase64 => {
        this.getPictureSuccess(imageBase64);
      });
    } else {
      this.nativeService.getPictureByPhotoLibrary(options).then(imageBase64 => {
        this.getPictureSuccess(imageBase64);
      });
    }
  }

  private getPictureSuccess(imageBase64) {
    this.user.avatar = 'data:image/jpeg;base64,' + imageBase64;
  }

  //检查商品信息填写是否完整
  checkInfoOver(): boolean {
    console.log(this.user);
    if(this.user.username == ""){
      this.showToast('top', "名字必须填写");
      return false;
    }
    if(this.user.mobile == ""){
      this.showToast('top', "电话必须填写");
      return false;
    }
    if(this.user.password == ""){
      this.showToast('top', "密码必须填写");
      return false;
    }
    return true;
  }

  //保存
  saveUser() {
    if(this.user.id){
      this.updateUser();
    }else {
      this.createUser();
    }
  }

  //新增员工
  createUser() {
    if (this.checkInfoOver()) {
      let param = this.user;
      param.password = Md5.hashStr(param.password);
      this.xzg.httpPost(this.xzg.api.ApiUseraddUser, param,(body)=>{
        this.showToast('top', body.msg);
        this.navCtrl.pop();
      },true);
    }
  }

  //修改员工
  updateUser() {
    if (this.checkInfoOver()) {
      let param = this.user;
      param.password = Md5.hashStr(param.password);
      this.xzg.httpPost(this.xzg.api.ApiUsereditUser, param,(body)=>{
        this.showToast('top', body.msg);
        this.navCtrl.pop();
      },true);
    }
  }

  //点击图片选择上传方式
  selectImage() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '上传图片',
      buttons: [
        {
          text: '拍照上传',
          icon:'camera',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.getPicture(1);
          }
        },{
          text: '从相机选择',
          icon:'image',
          // role: 'destructive',
          handler: () => {
            console.log('Archive clicked');
            this.getPicture(0);
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  //取消更新或者创建商品
  cancelSaveUser() {
    let confirm = this.alertCtrl.create({
      title: '提示',
      message: '你正在'+this.title,
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }



}

