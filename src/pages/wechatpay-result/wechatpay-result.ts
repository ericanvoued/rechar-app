import {Component, ViewChild} from '@angular/core';
import {IonicPage, Loading, LoadingController, NavParams, ViewController} from 'ionic-angular';
import {jquery} from "../../providers/tools/srcode-gener";

@IonicPage()
@Component({
  selector: 'page-wechatpay-result',
  templateUrl: 'wechatpay-result.html',
})
export class WechatpayResultPage {

  isQQBaidu: any;

  constructor(public loadingCtrl: LoadingController, public viewCtrl: ViewController, public navParams: NavParams) {
  }

  openurl: string
  loading: Loading;
  @ViewChild('webchatpaypage') iframe;
  isform: boolean;

  ionViewDidLoad() {
    /**
     * Created by richard.g on 03/06/2017.
     */

    function PlatformDetected() {
      var userAgent: any = navigator.userAgent.toLowerCase();
      this.isIpad = userAgent.match(/ipad/i) == "ipad";
      this.isIphoneOs = userAgent.match(/iphone os/i) == "iphone os";
      this.isMidp = userAgent.match(/midp/i) == "midp";
      this.isUc7 = userAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      this.isUc = userAgent.match(/ucweb/i) == "ucweb";
      this.isAndroid = userAgent.match(/android/i) == "android";
      this.isCE = userAgent.match(/windows ce/i) == "windows ce";
      this.isWM = userAgent.match(/windows mobile/i) == "windows mobile";
      this.isPhone = this.isIpad || this.isIphoneOs || this.isMidp || this.isUc7 || this.isUc || this.isAndroid || this.isCE || this.isWM;
    }

    let platformInstance = new PlatformDetected();
    this.isform = this.navParams.get('isform');
    this.isQQBaidu = this.navParams.get('isQQBaidu');

    if (this.isform) {
      setTimeout(() => {
        let data = this.navParams.get('data');
        document.getElementById('myformssss').innerHTML = data;
        setTimeout(() => {
          try {
            let doc: any;
            doc = document;
            doc.postSubmit.submit();
            document.getElementById('myformssss').innerHTML = '';
          } catch (e) {
            console.log('e=========:', e);
          }
        }, 10);
      }, 10)
      return;
    } else if (this.isQQBaidu) {
      jquery('#qrcode').html('');
      setTimeout(() => {
        let data = this.navParams.get('data');
        console.log(data);
        jquery('#qrcode').html('');
        jquery('#qrcode').qrcode(data);
      },100);
      return;
    }
    else if (platformInstance.isIphoneOs) {
      this.openurl = this.navParams.get('url');
      return;
    }

    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles'
    });
    this.loading.present();
    setTimeout(() => {
      let win = this.iframe.nativeElement.contentWindow;
      win.postMessage(this.navParams.get('data'), "*");

      setTimeout(() => {
        this.loading.dismiss();
      }, 1000)
    }, 1000);
  }

  dismiss() {
    let data = {'foo': 'bar'};
    this.viewCtrl.dismiss(data);
  }

}
