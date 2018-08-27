import { Component } from '@angular/core';
import { NavController ,IonicPage,NavParams,AlertController,ActionSheetController,ModalController} from 'ionic-angular';
import {NativeService} from "../../../../providers/NativeService";
import { Xzg } from '../../../../providers/util/xzg';
@IonicPage()
@Component({
  selector: 'page-member-detail',
  templateUrl: 'member.detail.html'
})
export class MemberDetailPage {
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
  //会员对象
  member: any = {
    "name": "",//名称
    "mobile":"",
    "birthday":"",
    "level_id":0,
    "from_member_id":0,
    "from_member_mobile":"",
    "from_member_name":"",
    "remark":""//备注
  };
  //推荐人
  fromMember:any = {
    name:"",
    mobile:""
  }
  memberLeveList: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public xzg: Xzg,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public actionSheetCtrl: ActionSheetController,
              private nativeService: NativeService) {


    this.action = this.navParams.get("action");
    if (this.action == "create") {
      this.title = "新增会员";
    } else if (this.action == "update") {
      this.title = "编辑会员";
    } else {
      this.title = "新增会员";
    }

    this.item = this.navParams.get("item");
    console.log(this.item)
    if(this.item){
      this.getMember(this.item);
    }else {
      this.member = this.member;
    }
  }

  ionViewDidEnter(){
    this.getMemberList();
  }
  //获取会员级别(新增会员的时候使用)
  getMemberList(){
    let param = {
    }
    this.xzg.httpGet(this.xzg.api.ApiMemberConfiggetMemberLevelList, param,(body)=>{
      console.log(body)
      this.memberLeveList = body.data;
    },true);
  }
  //通过输入电话号码查找推荐人
  getFromMember(){
    this.selectFromMember();
  }

  selectFromMember(){
    let modal = this.modalCtrl.create('SelectMemberPage');
    modal.present();
    modal.onWillDismiss((data: any[]) => {
      if (data) {
        console.log(data);
        this.fromMember = data;
      }
    });
  }

  getMember(id){
    console.log(id)
    let param = {
      id: id
    };
    this.xzg.httpGet(this.xzg.api.ApiMembergetMemberById, param,(body)=>{
      this.xzg.showToast('top', body.msg);
      console.log(body)
      this.member = body.data;
      this.fromMember.name = this.member.from_member_name;
      this.fromMember.mobile = this.member.from_member_mobile;
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
    this.member.thumb = 'data:image/jpeg;base64,' + imageBase64;
  }
  //扫描
  scanMember() {
    this.nativeService.scan().then(barcodeData => {
      this.member.sn = barcodeData;
    });
  }

  //检查商品信息填写是否完整
  checkInfoOver(): boolean {
    if(this.member.name == ""){
      this.xzg.showToast('top', "会员姓名必须填写");
      return false;
    }
    if(this.member.mobile == ""){
      this.xzg.showToast('top', "会员电话必须填写");
      return false;
    }
    return true;
  }

  //保存
  saveMember() {
    this.member.from_member_id = this.fromMember.id;
    this.member.from_member_name = this.fromMember.name;
    this.member.from_member_mobile = this.fromMember.mobile;
    if(this.member.id){
      this.updateMember();
    }else {
      this.createMember();
    }
  }

  //新增会员
  createMember() {
    if (this.checkInfoOver()) {
      let param = this.member;
      this.xzg.httpPostBody(this.xzg.api.ApiMemberaddMember, param,(body)=>{
        this.xzg.showToast('top', body.msg);
        this.navCtrl.pop();
      },true);
    }
  }

  //修改会员
  updateMember() {
    if (this.checkInfoOver()) {
      let param = this.member;
      this.xzg.httpPostBody(this.xzg.api.ApiMembereditMember, param,(body)=>{
        this.xzg.showToast('top', body.msg);
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
  cancelSaveMember() {
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



  recharge(money){
    let param = {
      id:this.member.id,
      money:money
    }
    console.log(param)
    this.xzg.httpPostBody(this.xzg.api.ApiMemberrecharge, param,(body)=>{
      this.xzg.showToast('top', body.msg);
      this.getMember(this.member.id);
    },true);
  }
  memberRecharge(){
      let prompt = this.alertCtrl.create({
        title: '充值',
        message: "请输入大约 1 的整数",
        inputs: [
          {
            name: 'val',
            placeholder: '请输入：',
            value:'100'
          },
        ],
        buttons: [
          {
            text: '取消',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: '保存',
            handler: data => {
              this.recharge(parseInt(data.val));
            }
          }
        ]
      });
      prompt.present();
  }
  //删除
  deleteMember(member){
    let param = {
      id: member.id
    }
    let confirm = this.alertCtrl.create({
      title: '提示',
      message: '你确定要删除此会员吗？',
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
            this.xzg.httpGet(this.xzg.api.ApiMemberdelMember, param,(body)=>{
              this.navCtrl.pop();
            },true);

          }
        }
      ]
    });
    confirm.present();

  }


}

