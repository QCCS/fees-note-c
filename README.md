node:8.0.0

### 安装nvm：切换node版本
### nvm use 8.0.0

###安装环境
npm install -g cordova ionic

ionic -v

是3以上的版本

###初始化项目：
ionic start myApp sidemenu

cd myApp
###启动
ionic serve

###andriod打包
ionic cordova platform --help

ionic cordova platform add android

### debug包
ionic cordova build android

### 正式包需要签名

ionic cordova build android --release

ionic cordova build android --prod --release

### 错误处理
if:
Error: Cannot find module '/Users/zhouli/WebstormProjects/myApp/node_modules/@ionic/app-scripts'

模块在node 8就没有了 @ionic/app-scripts -save-dev

npm i @ionic/app-scripts -save-dev

if:
/myApp/node_modules/@angular/tsc-wrapped/src/main.js:12:15

npm i typescript@^2.1.5 --save-dev

npm i @angular/tsc-wrapped@4.4.4 --save-dev

打包失败：

/Users/zhouli/Library/Android/sdk/tools

./android打开Android SDK Manager

安装对应的SDK


### 扫码(目前使用)：

npm install --save @ionic-native/barcode-scanner

ionic cordova plugin add phonegap-plugin-barcodescanner


### 扫码(未安装，若是安装需要卸载已有的)：

ionic cordova plugin add cordova-plugin-cszbar

npm install --save @ionic-native/zbar


### 需要把相机拍照（或者相册选择）生成的图片路径转为base64

npm install @ionic-native/file  --save

ionic cordova plugin add cordova-plugin-file



### 选择相册与相机

npm install @ionic-native/camera --save

ionic cordova plugin add cordova-plugin-camera


### 首屏时间
    
config.xml value代表时间
    
<preference name="SplashScreenDelay" value="1000" />

是否自动关闭

<preference name="AutoHideSplashScreen" value="false" />

