import {Injectable} from '@angular/core';


//公共的函数
@Injectable()
export class Funs {


  constructor() {


  }


  //判断是否为空对象
  isEmpty(obj) {
    for (let key in obj) {
      return false;
    }
    return true;
  }
  //没有重复项的数组链接
  //数组中是带有id的对象
  // var arr1 = [
  //   {
  //     id: 2,
  //   },
  //   {
  //     id: 1,
  //     count: 2,
  //   },
  // ]
  // var arr2 = [
  //   {
  //     id: 2,
  //   },
  //   {
  //     id: 1,
  //     count: 2,
  //   },
  // ]
  combineArr(source, target) {
    var T = [];
    var isAdd = false;
    for (var i = 0; i < target.length; i++) {
      isAdd = false;
      for (var j = 0; j < source.length; j++) {
        if (target[i].id == source[j].id) {
          isAdd = true;
          if(source[j].count){
            source[j].count++
          }else {
            source[j].count = 1;
          }
        }
      }
      if(!isAdd){
        T.push(target[i]);
      }
    }
    return source.concat(T)
  }

  //数组去重：数组里面是对象
  unique(source,target) {
    var arr = source.concat(target)
    var res = [];
    var json = {};
    for(var i = 0; i < arr.length; i++){
      if(!json[arr[i].id]){
        res.push(arr[i]);
        json[arr[i].id] = 1;
      }
    }
    return res;
  }
}
