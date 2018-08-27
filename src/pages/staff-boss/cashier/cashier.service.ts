import {Injectable} from '@angular/core';
//收银柜台服务，记住购物车的商品
@Injectable()
export class CashierService {
  private total:any = 0;
  private list:any = [];
  constructor() {
  }
  // 重置购物车
  reset(){
    this.list = [];
    this.total = [];
  }
  //添加商品（多个）
  addGoodsList(goods){
    this.list = this.combineArr(this.list,goods);
    this.getTotal();
  }
  //获取购物车商品
  getGoodsList(){
    return this.list;
  }
  //获取购物车商品的总价
  getGoodsTotal(){
    return this.total;
  }
  //减少单个商品
  minGoodCount(good){
    if(good.cost_num>1){
      good.cost_num --;
      this.getTotal();
    }
  }
  //输入商品数量
  cost_numChange($event,good) {
    if($event <= 1){
      $event = 1
    }
    good.cost_num = $event;
    this.getTotal();
  }

  //添加单个商品
  addGoodCount(good){
    good.cost_num ++;
    this.getTotal();
  }
  //删除已经选择的商品
  deleteGood(good,index){
    this.list.splice(index,1);
    this.getTotal();
  }
  //计算总价
  getTotal(){
    this.total = 0;
    if(this.list.length > 0){
      for(let i=0;i<this.list.length;i++){
        if(this.list[i].cost_num){
          this.total += parseInt(this.list[i].price) * this.list[i].cost_num;
        }else {
          this.list[i].cost_num = 1;
          this.total += parseInt(this.list[i].price) * this.list[i].cost_num;
        }
      }
    }else {
      this.total = 0;
    }
  }
  // 传入两个数组
  // 把target连接在source上，
  // 如果有重复target的count字段加1
  combineArr(source, target) {
    var T = [];
    var isAdd = false;
    for (var i = 0; i < target.length; i++) {
      isAdd = false;
      for (var j = 0; j < source.length; j++) {
        if (target[i].id == source[j].id) {
          isAdd = true;
          if(source[j].cost_num){
            source[j].cost_num++
          }else {
            source[j].cost_num = 1;
          }
        }
      }
      if(!isAdd){
        T.push(target[i]);
      }
    }
    return source.concat(T)
  }

}

