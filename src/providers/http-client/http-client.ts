import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

import {Config} from "../../config/config";
import {GlobalShareProvider} from "../global-share/global-share";

@Injectable()
export class HttpClientProvider {
  baseUrl = Config.baseurl;
  public options = new RequestOptions({withCredentials: true});

  constructor(public http: Http, public share: GlobalShareProvider) {
  }

  get(url): Promise<any> {
    return this.doSubmitAction(url);
  }

  post(url, data): Promise<any> {
    return this.doSubmitAction(url, data);
  }

  autoLoginOutId: any;

  async logout() {
    this.share.store.remove('app_user');
    this.share.user = null;
    localStorage.expired = Date.now();
    this.share.presentToast("您太久没有操作，帐号已自动退出");
    setTimeout(() => {
      location.reload();
    }, 3000);
  }

  beforeRequest() {
    let a = localStorage.expired;
    let b = Date.now();
    if ((b - a) > 1800000) this.logout();
    return (b - a) > 1800000;
  }

  private doSubmitAction(url, data?): Promise<any> {
    clearTimeout(this.autoLoginOutId);
    this.autoLoginOutId = setTimeout(() => this.logout(), 1800000);
    return new Promise((resolve, reject) => {
      if (this.beforeRequest()) {
        reject({isSuccess: 0});
        this.share.hidepresentLoadingDefault();
        return;
      }
      if (data) {
        return this.http.post(this.baseUrl + url, data, this.options).map(res => res.json()).subscribe((data) => {
          if(data.isSuccess){
            resolve(data);
            this.share.hidepresentLoadingDefault();
          }else{
            this.share.presentToast(data.Msg);
            this.share.hidepresentLoadingDefault();
            reject(data);
          }
        }, (e) => {
          this.share.presentToast(JSON.stringify(e));
          this.share.hidepresentLoadingDefault();
          reject(e);
        })
      } else {
        return this.http.get(this.baseUrl + url, this.options).map(res => res.json()).subscribe((data) => {
          if(data.isSuccess){
            resolve(data);
            this.share.hidepresentLoadingDefault();
          }else{
            this.share.presentToast(data.Msg);
            this.share.hidepresentLoadingDefault();
            reject(data);
          }
        }, (e) => {
          this.share.presentToast(e);
          this.share.hidepresentLoadingDefault();
          reject(e);
        })
      }
    })
  }
}

