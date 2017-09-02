import {Component, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {jquery} from "../../../providers/sc-code/sc-code";

@IonicPage()
@Component({
  selector: 'page-code-comfirm',
  templateUrl: 'code-comfirm.html',
})
export class CodeComfirmPage {
  userAgent: any;
  isIphoneOs:boolean;
  data:any;
  title:any;
  isCode:boolean;
  doc:any;
  loading:any;
  @ViewChild('webchatpaypage') iframe;

  constructor(public loadingCtrl: LoadingController,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.userAgent = navigator.userAgent.toLowerCase();
    this.isIphoneOs = this.userAgent.match(/iphone os/i) == "iphone os";
    this.data = this.navParams.get('data');
    this.title = this.navParams.get('title');
    this.isCode = true;
    if(this.title=='微信充值')
      if(!(/weixin:\/\//.test(this.data))) this.isCode = false;
    if (this.title=='银联充值') {
      this.formData();
    } else if(this.isCode) {
      this.codeData();
    }else if(!this.isIphoneOs){
      this.notPhone();
    }
  }

  formData(){
    setTimeout(() => {
      document.getElementById('myForm').innerHTML = this.data;
      setTimeout(() => {
        try {
          this.doc = document;
          this.doc.postSubmit.submit();
          document.getElementById('myForm').innerHTML = '';
        } catch (e) {
          console.log('e=========:', e);
        }
      }, 10);
    }, 10)
  }

  codeData(){
    jquery('#qrCode').html('');
    setTimeout(() => {
      jquery('#qrCode').html('');
      jquery('#qrCode').qrcode(this.data);
    },100);
  }

  notPhone(){
    this.showLoading();
    setTimeout(() => {
      let win = this.iframe.nativeElement.contentWindow;
      win.postMessage(this.data, "*");
      setTimeout(() => this.loading.dismiss(), 1000);
    }, 1000);
  }

  showLoading() {
    if (!this.loading) {
      this.loading = this.loadingCtrl.create({spinner: 'bubbles'});
      this.loading.present();
    }
  }

  dismiss() {
    this.viewCtrl.dismiss({'foo': 'bar'});
  }
}
