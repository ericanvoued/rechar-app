import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {LoadingController, ToastController} from "ionic-angular";

@Injectable()
export class GlobalShareProvider {
  pid: string;
  basketData = [];
  basketDataValideArr=[];
  globalData: { globalMutile: number, trace: number }={globalMutile: 1, trace: 1};
  MinMutiple: {minmax_multiple: 0, c: any};

  loading: any;
  user: any={_token:''};
  dataGroup: any=[];
  dataItems: any;
  balance: any;
  gameRecord = {data: []};
  chargeRecord = {data: []};
  parameters = {0:{
    _token: '',
    page: 1,
    end: '',
    start: '',
    bet_status: 1,
    lottery_id: ''
  },1:{
    _token: '',
    page: 1,
    end: '',
    start: '',
    bet_status: 1,
    lottery_id: ''
  }};
  bankcardDetail2: any;
  bankcardDetail: any;
  gameId: any | string | number;
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

  setPid(name: string) {
    this.pid = name;
  }
  getPid() {
    return this.pid;
  }

}
