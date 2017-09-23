import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AlertController, LoadingController, ToastController} from "ionic-angular";

@Injectable()
export class GlobalShareProvider {
  pid: string;
  basketData = [];
  basketDataValideArr=[];
  globalData: { globalMutile: number, trace: number }={globalMutile: 1, trace: 1};
  MinMutiple: {minmax_multiple: 0, c: any};

  loading: any;
  user: any;
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
  gameId: any | string | number;
  defaultData: any;
  ispk10: any;
  constructor(public http: Http, private toastCtrl: ToastController, public loadingCtrl: LoadingController,public alertCtrl: AlertController) {}

  showToast(msg,time?,position?) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: time?time:2000,
      position: position?position:'middle'
    });
    toast.present();
  }

  showAlert(title,button?,subTitle?,msg?,input?) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle?subTitle:'',
      message:msg?msg:'',
      inputs:input?input:'',
      buttons:button?button:''
    });
    alert.present();
  }

  hideLoading() {
    this.loading && this.loading.dismiss();
    this.loading = null;
  }

  showLoading(msg?) {
    if (!this.loading) {
      this.loading = this.loadingCtrl.create({content: msg ? msg : '', spinner: 'bubbles'});
      this.loading.present();
    }
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
  };

  setPid(name: string) {
    this.pid = name;
  }
  getPid() {
    return this.pid;
  }

}
