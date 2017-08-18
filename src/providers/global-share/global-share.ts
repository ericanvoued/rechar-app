import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {LoadingController, ToastController} from "ionic-angular";

/*
  Generated class for the GlobalShareProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GlobalShareProvider {
  loading: any;
  usr: any;
  _token:any;
  balance: any;
  constructor(public http: Http, private toastCtrl: ToastController, public loadingCtrl: LoadingController) {
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

  presentLoadingDefault(msg?) {
    if (!this.loading) {
      this.loading = this.loadingCtrl.create({
        content: msg ? msg : '数据加载中...'
      });
      this.loading.present();
    }
  }

  hidepresentLoadingDefault() {
    this.loading && this.loading.dismiss();
    this.loading = null;
  }

  store = {
    get (key: string) {
      return JSON.parse(localStorage.getItem(key));
    },
    set (key: string, value: any) {
      if (typeof value != 'number')
        value = JSON.stringify(value);
      localStorage.setItem(key, value);
    },
    remove(key: string) {
      localStorage.removeItem(key);
    }
  }
}
