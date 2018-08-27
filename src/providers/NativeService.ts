import {Injectable} from '@angular/core';
import {ToastController, LoadingController,Events} from 'ionic-angular';
import {Camera} from '@ionic-native/camera';
import {File} from '@ionic-native/file';
//zbar也是一个扫描插件，据说性能好一点
import {ZBar} from '@ionic-native/zbar';
// import {ZBar, ZBarOptions} from '@ionic-native/zbar';
import { Network } from '@ionic-native/network';
@Injectable()
export class NativeService {
  private toast;
  private loading;

  constructor(private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private camera: Camera,
              private file: File,
              public events: Events,
              private network: Network,
              private zbar: ZBar) {
  }


  //监听断线
  onDisconnect(){
    this.network.onDisconnect().subscribe(() => {
      this.events.publish('netWork:disconnect', '断线了');
    })
  }
  //判断是否正常
  netIsWork(){
    this.network.onConnect().subscribe(() => {
      setTimeout(() => {
        this.events.publish('netWork:connect', this.network.type);
      }, 2000);
    })
  }
  /**
   * 统一调用此方法显示提示信息
   * @param message 信息内容
   * @param duration 显示时长
   */
  showToast = (message: string = '操作完成', duration: number = 2500) => {
    this.toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'top',
      showCloseButton: true,
      closeButtonText: '关闭'
    });
    this.toast.present();
  };

  /**
   * 关闭信息提示框
   */
  hideToast = () => {
    this.toast.dismissAll()
  };

  /**
   * 统一调用此方法显示loading
   * @param content 显示的内容
   */
  showLoading = (content: string = '') => {
    this.loading = this.loadingCtrl.create({
      content: content
    });
    this.loading.present();
    setTimeout(() => {//最长显示20秒
      this.loading.dismiss();
    }, 20000);
  };

  /**
   * 关闭loading
   */
  hideLoading = () => {
    this.loading.dismissAll()
  };

  /**
   * 使用cordova-plugin-camera获取照片的base64
   * @param options
   * @return {Promise<T>}
   */
  getPicture = (options) => {
    return new Promise((resolve, reject) => {
      this.camera.getPicture(Object.assign({
        sourceType: this.camera.PictureSourceType.CAMERA,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
        destinationType: this.camera.DestinationType.DATA_URL,//返回值格式,DATA_URL:base64,FILE_URI:图片路径
        quality: 100,//保存的图像质量，范围为0 - 100如果是90就不清晰了
        allowEdit: true,//选择图片前是否允许编辑
        encodingType: this.camera.EncodingType.JPEG,
        targetWidth: 800,//缩放图像的宽度（像素）
        targetHeight: 800,//缩放图像的高度（像素）
        saveToPhotoAlbum: false,//是否保存到相册
        correctOrientation: true//设置摄像机拍摄的图像是否为正确的方向
      }, options)).then((imageData) => {
        resolve(imageData);
      }, (err) => {
        console.log(err);
        err == 20 ? this.showToast('没有权限,请在设置中开启权限') : reject(err);
      });
    });
  };

  /**
   * 通过图库获取照片
   * @param options
   * @return {Promise<T>}
   */
  getPictureByPhotoLibrary = (options = {}) => {
    return new Promise((resolve) => {
      this.camera.getPicture(Object.assign({
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }, options)).then(imageBase64 => {
        this.convertImgToBase64(imageBase64, function (img) {
          resolve(img);
        })
        // resolve(imageBase64);
      }).catch(err => {
        String(err).indexOf('cancel') != -1 ? this.showToast('取消选择图片', 1500) : this.showToast('获取照片失败');
      });
    });
  };

  scan() {
    var params = {
      text_title: "扫码", // Android only
      text_instructions: "请对准二维码或条形码", // Android only
      camera: "back",//  "back",front
      flash: "auto",// "on" || "off" || "auto"  defaults to "auto". See Quirks
      drawSight: true// || false //defaults to true, create a red sight/line in the center of the scanner view.
    }
    // return this.zbar.scan(params);
    return new Promise((resolve) => {
      return this.zbar.scan(params).then(barcodeData => {
        resolve(barcodeData);
      }).catch(err => {
        String(err).indexOf('cancel') != -1 ? this.showToast('取消扫码', 1500) : this.showToast('扫码失败');
      });
    });
  }
  /**
   * 通过拍照获取照片
   * @param options
   * @return {Promise<T>}
   */
  getPictureByCamera = (options = {}) => {
    return new Promise((resolve) => {
      this.camera.getPicture(Object.assign({
        sourceType: this.camera.PictureSourceType.CAMERA
      }, options)).then(imageBase64 => {
        this.convertImgToBase64(imageBase64, function (img) {
          resolve(img);
        })
      }).catch(err => {
        String(err).indexOf('cancel') != -1 ? this.showToast('取消拍照', 1500) : this.showToast('获取照片失败');
      });
    });
  };


  /**
   * 根据图片绝对路径转化为base64字符串
   * @param url 绝对路径
   * @param callback 回调函数
   */
  convertImgToBase64(url, callback) {
    this.getFileContentAsBase64(url, function (base64Image) {
      callback.call(this, base64Image.substring(base64Image.indexOf(';base64,') + 8));
    })

  }

  private getFileContentAsBase64(path, callback) {
    function fail(err) {
      console.log('Cannot found requested file' + err);
    }

    function gotFile(fileEntry) {
      fileEntry.file(function (file) {
        let reader = new FileReader();
        reader.onloadend = function (e) {
          let content = this.result;
          callback(content);
        };
        reader.readAsDataURL(file);
      });
    }

    this.file.resolveLocalFilesystemUrl(path).then(fileEnter => gotFile(fileEnter)).catch(err => fail(err));
    // window['resolveLocalFileSystemURL'](path, gotFile, fail);
  }
  // scan(){
  //   return new Promise((resolve) => {
  //     this.barcodeScanner.scan()
  //       .then(function(barcodeData) {
  //         // Success! Barcode data is
  //         alert("We got a barcode\n" +
  //           "Result: " + barcodeData.text + "\n" +
  //           "Format: " + barcodeData.format + "\n" +
  //           "Cancelled: " + barcodeData.cancelled);
  //         resolve(barcodeData);
  //       }).catch(err => {
  //          console.log(err);
  //          String(err).indexOf('cancel') != -1 ? this.showToast('取消扫描图片', 1500) : this.showToast('扫描失败');
  //          console.log(1);
  //       });
  //   });
  //
  //
  // }



  //
  // scan(){
  //   return new Promise((resolve) => {
  //     this.barcodeScanner.scan()
  //       .then(function(barcodeData) {
  //         // Success! Barcode data is
  //         alert("We got a barcode\n" +
  //           "Result: " + barcodeData.text + "\n" +
  //           "Format: " + barcodeData.format + "\n" +
  //           "Cancelled: " + barcodeData.cancelled);
  //         resolve(barcodeData);
  //       }, function(error) {
  //         // An error occurred
  //         console.log(error)
  //         String(error).indexOf('cancel') != -1 ? this.showToast('取消扫描', 1500) : this.showToast('扫描失败');
  //         console.log(1)
  //       });
  //   });

  // NOTE: encoding not functioning yet
  // this.barcodeScanner
  //   .encode(this.barcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com")
  //   .then(function(success) {
  //     // Success!
  //   }, function(error) {
  //     // An error occurred
  //   });

  // }



}

