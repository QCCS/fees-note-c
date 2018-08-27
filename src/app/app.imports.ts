//模块
import { BrowserModule } from '@angular/platform-browser';
import { AngularEchartsModule } from 'ngx-echarts';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

// ---------------------
//原生插件导入
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { ZBar } from '@ionic-native/zbar';
import { Network } from '@ionic-native/network';
//封装原生插件
import {NativeService} from "../providers/NativeService";

//公共服务
import {Localstorage} from "../providers/util/localstorage";
import { Xzg } from '../providers/util/xzg';
// 全局状态设置主题
import { AppState } from './app.global';

//应用服务
import {CashierService} from "../pages/staff-boss/cashier/cashier.service";

//必要模块
export const MODULES = [
  BrowserModule,
  HttpModule,
  AngularEchartsModule,
  IonicStorageModule.forRoot(),
];

//必要providers
export const PROVIDERS = [
  StatusBar,
  SplashScreen,
  Camera,
  File,
  ZBar,
  Network,
  NativeService,
  Localstorage,
  Xzg,
  AppState,
  CashierService
];

// 公共组件
export const DIRECTIVES = [

];
