import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AlertController, LoadingController, ToastController} from "ionic-angular";

@Injectable()
export class GlobalShareProvider {
  timers={divTimer:{timer:null,show:false},titleTimer:{timer:null,show:false}};
  moreType=0;
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
  plat='h5';
  yearReg = /[\d]{4}-/;
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
  defaultData: any;
  ispk10: any;
  totalAllCount: number=0;
  constructor(private toastCtrl: ToastController, public loadingCtrl: LoadingController,public alertCtrl: AlertController) {}

  checkPlatform() {
    let userAgent: any = navigator.userAgent.toLowerCase();
    this.plat='h5';
    if(userAgent.match(/iphone os/i) == "iphone os"){
      this.plat='ios';
    }else if(userAgent.match(/android/i) == "android"){
      this.plat='android';
    }
  }

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

  setTimer(name,time,fun?){
    for(let k in this.timers){
      if(k==name){
        clearInterval(this.timers[k].timer);
        this.timers[k].timer = setInterval(() => {
          this.timers[k].show = !this.timers[k].show;
          if(fun) fun;
        }, time);
        return;
      }
    }
  }

  clearTimer(){
    for(let k in this.timers) {clearInterval(this.timers[k].timer);}
  }

  setMore(num){
    this.moreType=num;
  }
}
