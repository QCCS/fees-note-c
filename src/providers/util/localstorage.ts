import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';

@Injectable()
export class Localstorage {
  constructor(public http: Http,
              private storage:Storage) {
  }
  set(key:string,val:any){
    return this.storage.set(key,val);
  }
  get(key:string){
    return this.storage.get(key);
  }
  remove(key:string){
    return this.storage.remove(key);
  }
  //清除所有本地存储
  clearStorage(){
    return this.storage.clear();
  }

}
