import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

import {Config} from "../../config/config";
import {GlobalShareProvider} from "../global-share/global-share";


@Injectable()
export class HttpClientProvider {
  baseUrl = Config.baseurl
  public options = new RequestOptions({withCredentials: true});

  constructor( public http: Http, public share: GlobalShareProvider) {

  }

  get(url): Promise<any> {
    return this.doSubmitAction(url);
  }

  post(url, data): Promise<any> {
    return this.doSubmitAction(url, data);
  }

  autoLoginOutId:any;
  async logout() {
     this.share.store.remove('userinfo');
     this.share.store.remove('userlogindata');
    this.share.usr = null;
    this.share.presentToast("您太久没有操作，帐号已自动退出");
    setTimeout(() => {
      location.reload();
    },1000);
  }
  beforeRequest(){
    let a = localStorage.expired;
    let b = Date.now();
    if((b-a)>1800000){
      localStorage.expired = Date.now();
      this.logout()
    }
    return (b-a)>1800000;
  }
  private doSubmitAction(url, data?): Promise<any> {
    clearTimeout(this.autoLoginOutId);
    this.autoLoginOutId=setTimeout(()=>this.logout(),1800000);

    return new Promise((resolve, reject) => {
      if(this.beforeRequest()){
        resolve({status:1});
        return;
      }

      if (data) {
        return this.http.post(this.baseUrl + url, data).map(res => res.json()).subscribe((data) => {
          if (data.status != 0) {
            console.log("后台错误信息输出：",data.msg);

          } else if (data.status == 1) {
            this.logout();
          }
          resolve(data);
          this.share.hidepresentLoadingDefault();
        }, (e) => {
          this.share.presentToast(e);
          this.share.hidepresentLoadingDefault();
          reject(e);
        });
      } else {
        return this.http.get(this.baseUrl + url).map(res => res.json()).subscribe((data) => {
          if (data.status != 0) {
            reject(data);
            this.share.presentToast(data.msg);
          } else {
            resolve(data);
          }
          this.share.hidepresentLoadingDefault();
        }, (e) => {
          this.share.presentToast(e);
          this.share.hidepresentLoadingDefault();
          reject(e);
        });
      }
    });


  }
}

