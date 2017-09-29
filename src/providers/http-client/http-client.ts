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

  logout() {
    this.share.store.remove('app_user');
    this.share.user = null;
    localStorage.expired = Date.now();
    setTimeout(() => location.reload(), 3000);
  }

  beforeRequest() {
    let a = localStorage.expired;
    let b = Date.now();
    if ((b - a) > 1800000)
      this.logout();
    else
      localStorage.expired = Date.now();
    return (b - a) > 1800000;
  }

  private doSubmitAction(url, data?): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.beforeRequest()) {
        reject({isSuccess: 0});
        this.share.hideLoading();
        return;
      }
      if (data) {
        return this.http.post(this.baseUrl + url, data, this.options).map(res => res.json()).subscribe((data) => {
          if (data.isSuccess) {
            resolve(data);
            this.share.hideLoading();
          } else {
            this.share.showToast(data.Msg, 3000);
            this.share.hideLoading();
            reject(data);
          }
        }, (e) => {
          this.share.showToast(JSON.stringify(e), 3000);
          this.share.hideLoading();
          reject(e);
        })
      } else {
        return this.http.get(this.baseUrl + url, this.options).map(res => res.json()).subscribe((data) => {
          if (data.isSuccess) {
            resolve(data);
            this.share.hideLoading();
          } else {
            this.share.showToast(data.Msg, 3000);
            this.share.hideLoading();
            reject(data);
          }
        }, (e) => {
          this.share.showToast(e, 3000);
          this.share.hideLoading();
          reject(e);
        })
      }
    })
  }
}

