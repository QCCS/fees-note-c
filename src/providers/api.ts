//api列表
export const API: any = {
  //登陆
  ApiLoginlogin:"/Api/Login/login",//登陆:手机号与密码
  ApiLoginlogout:"/Api/Login/logout",//退出接口：手机号
  ApiLoginrefreshToken:"/Api/Login/refreshToken",//刷新token：手机号与refresh_token

  //个人配置
  ApiConfiggetAccount:"/Api/Config/getAccount",//个人信息

  //商品(积分商品)
  ApiGoodsgetGoods: '/Api/Goods/getGoods',//获取单个商品:id=1
  ApiGoodsdelGoods:"/Api/Goods/delGoods",//删除单个商品:id=1
  ApiGoodsaddGoods:"/Api/Goods/addGoods",//新增单个商品:商品对象
  ApiGoodseditGoods: '/Api/Goods/editGoods',//更新单个商品：商品对象
  ApiGoodsscanCode:"/Api/Goods/scanCode",//条形码查询商品：sn=SN
  //商品列表
  ApiGoodsgetGoodsList: '/Api/Goods/getGoodsList',//获取商品列表:pagesize=10&p=1&name=NAME默认0按创建时间降序
  //收银台
  ApiGoodsgetGoodsListForSale: '/Api/Goods/getGoodsListForSale',//商品查询列表(销售商品)
  //积分兑换商品列表
  ApiGoodsgetGoodsListForExchange:"/Api/Goods/getGoodsListForExchange",//商品查询列表(兑换商品)
  ApiScoreOrderbuildOrder:"/Api/ScoreOrder/buildOrder",//POST{"member_id":1,"goods_id":1}(兑换商品)

  //员工
  ApiUsergetUser: '/Api/User/getUser',//获取单个员工:id=1
  ApiUsergetUserList: '/Api/User/getUserList',//获取员工列表:pagesize=10&p=1&name=NAME
  ApiUserdelUser:"/Api/User/delUser",//删除单个员工:id=1
  ApiUseraddUser:"/Api/User/addUser",//新增单个员工:员工对象
  ApiUsereditUser: '/Api/User/editUser',//更新单个员工：员工对象

  //订单
  ApiOrderbuildOrder:"/Api/Order/buildOrder",//传入商品与总价生成订单：
  ApiOrderpayOrder:"/Api/Order/payOrder",//POST方式-支付：orderId=4134134&paymentType=1
  ApiOrderpayOrderCancel:"/Api/Order/cancelOrder",//get方式-订单取消id=ID
  ApiOrdergetOrderList:"/Api/Order/getOrderList",//get方式-订单订单列表pagesize=10&p=1[&start_time=150293838][&end_time=150293838]&token=TOKEN
  // 可选参数start_time=150293838 end_time=150293838
  ApiOrdergetOrder:"/Api/Order/getOrder",//get方式-订单详情id=ID

  //会员
  ApiMembergetMemberList: '/Api/Member/getMemberList',// 会员列表接口：get
  ApiMemberaddMember: '/Api/Member/addMember',//会员新增接口POST
  ApiMembergetMemberById:"/Api/Member/getMemberById",//获取会员详情GET：id
  ApiMembergetMemberByMobile:"/Api/Member/getMemberByMobile",//获取会员详情GET：手机号
  ApiMembereditMember:"/Api/Member/editMember",//会员修改接口:post
  ApiMemberdelMember: '/Api/Member/delMember',//删除会员接口:GET
  ApiMemberrecharge: '/Api/Member/recharge',//会员充值:post  {"id":1,"money":100.00}
  //会员记录
  ApiMembergetMemberOrderList:"/Api/Member/getMemberOrderList",//get 参数 member_id=ID&pagesize=10&p=1&token=TOKEN
  //  其中，返回参数中的payment_type=1使用现金消费 payment_type=2会员余额消费 total_price：原价  receive_money:实收金额，即会员打完折并抹零后的价格
  ApiMembergetMemberRechargeList:"/Api/Member/getMemberRechargeList",//get 参数 member_id=ID&pagesize=10&p=1&token=TOKEN

  //会员等级
  ApiMemberConfigaddMemberLevel:"/Api/MemberConfig/addMemberLevel",//POST新增，{"title":"钻石会员","upgrade_money":10000.00,"discount":0.75}
  ApiMemberConfigeditMemberLevel:"/Api/MemberConfig/editMemberLevel",//POST修改，修改的时候有id{"title":"钻石会员","upgrade_money":10000.00,"discount":0.75}
  ApiMemberConfiggetMemberLevelList:"/Api/MemberConfig/getMemberLevelList",//会员等级列表
  ApiMemberConfigdeleteMemberLevel:"/Api/MemberConfig/deleteMemberLevel",//删除会员列表id

  //积分设置
  ApiMemberConfiggetMemberConfig:"/Api/MemberConfig/getMemberConfig",//get
  ApiMemberConfigsetMemberConfig:"/Api/MemberConfig/setMemberConfig",//post {"consume_score_rate":1.0,"extend_score":10,"default_score":100,"referral_consume_score":0.1}

  //我的业绩
  ApiReportgetMyReport:"/Api/Report/getMyReport",//get（总揽）type={day,week,month}
  ApiReportgetMyChart:"/Api/Report/getMyChart",//get获取我的业绩图表type={day,week,month}

  };
