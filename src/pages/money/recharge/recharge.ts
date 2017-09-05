import {Component} from '@angular/core';
import {
  IonicPage, ModalController, NavController, NavParams, ViewController
} from 'ionic-angular';
import {Config} from "../../../config/config";
import {MoneySericeProvider} from "../../../providers/service/money-serice/money-serice";
import {GlobalShareProvider} from "../../../providers/global-share/global-share";

@IonicPage()
@Component({
  selector: 'page-recharge',
  templateUrl: 'recharge.html',
})
export class RechargePage {
  bankcardIconMap = Config.bankcardIconMap;
  loading: any;
  payData=[{name: 'alipay', max: 3000, remind: true, button: '支付宝安全充值', deposit_mode: 2, bank_code: 'ALIPAY', bank: 43},
    {name: 'weixin', max: 500, remind: true, button: '微信安全充值', deposit_mode: 2, bank_code: 'WEIXIN', bank: 48},
    {name: 'bankkj', max: 10000, remind: true, button: '立即充值', deposit_mode: 2, bank_code: 'KJCZ', bank: 0},
    {name: 'bank', max: 45000, remind: true, button: '下一步', deposit_mode: 1, bank_code: 'WYCZ', bank: 0},
    {name: 'yinlian', max: 45000, remind: true, button: '下一步', deposit_mode: 2, bank_code: 'UNION', bank: 47},
    {name: 'baidu', max: 5000, remind: false, button: '下一步', deposit_mode: 2, bank_code: 'BAIDU', bank: 50},
    {name: 'qq', max: 5000, remind: false, button: '下一步', deposit_mode: 2, bank_code: 'QQ', bank: 49}];
  result=false;

  constructor(public modalCtrl: ModalController,public share:GlobalShareProvider, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public money: MoneySericeProvider) {
    this.loadData();
  }

  checkButton(text) {
    if (!this.money.payType) return false;
    for (let k in this.money.payType) {
      if (k == text && this.money.payType[k] == 1) return true;
    }
    return false;
  }

  checkBind() {
    if (!this.share.user.is_set_fund_password || this.share.user.is_set_fund_password != 1){
      this.share.showToast('您未绑卡,请先绑卡');
      setTimeout(() => this.pushPage('BindBankPage'), 1000);
      return true;
    }
    return false;
  }

  async loadData() {
    if(this.checkBind()) return;
    if(!this.navParams.get('item')){
      await this.money.checkPayType();
      this.changePayType();
    }else{
      this.money.bankItem = this.navParams.get('item');
    }
  }

  changePayType() {
    if (!this.money.payType) return;
    this.clearType();
    for (let k in this.money.payType) {
      if (this.money.payType[k] == 1 && this.money.payClass.display=='') {
        this.money.payClass.display = k;
        this.setType();
        break;
      }
    }
  }

  clearType(){
    this.money.payClass.display='';
    this.money.payClass.max=0;
    this.money.payClass.remind=false;
    this.money.payClass.button='';
    this.money.payClass.post.amount = 10;
    for(let k in this.money.payClass.show)
      this.money.payClass.show[k]='';
  }

  setType(){
    for(let k in this.money.payClass.show){
      if(k==this.money.payClass.display){
        this.money.payClass.show[k]='active';
        break;
      }
    }
    for(let v in this.payData){
      if(this.payData[v].name==this.money.payClass.display){
        this.money.payClass.max = Number(this.payData[v].max);
        this.money.payClass.remind=this.payData[v].remind;
        this.money.payClass.button=this.payData[v].button;
        this.money.payClass.post.deposit_mode=this.payData[v].deposit_mode;
        this.money.payClass.post.bank_code=this.payData[v].bank_code;
        this.money.payClass.post.bank=this.payData[v].bank;
        break;
      }
    }
  }

  async goItem(text){
    this.money.bankItem='';
    if (!this.money.payType) return;
    this.clearType();
    this.money.payClass.display = text;
    this.setType();
    if(text=='bankkj' || text=='bank'){
      await this.money.getBankList();
    }else if(text=='yinlian'){
      await this.money.getUnion();
    }
  }

  selectBank() {
    if (this.money.bankCardList.length)
      this.navCtrl.push('SelectBankPage', {data: this.money.bankCardList,pay:this.money.payClass});
  }

  async nextStep(){
    this.checkInput(this.money.payClass.post,10,this.money.payClass.max);
    if(!this.result) return;
    this.share.showLoading();
    this.money.payClass.post._token = this.share.user.token;
    if(this.money.payClass.display=='alipay'){
      await this.money.postAlipayCode();
      this.share.hideLoading();
      if(this.money.aliCode) this.toAliPay(this.money.aliCode);
    }else if(this.money.payClass.display=='weixin'){
      await this.money.postWechartCode();
      this.share.hideLoading();
      if(this.money.weCode) this.presentModal(this.money.weCode.data.break_url, '微信充值');
    }else if((this.money.payClass.display=='bankkj') || (this.money.payClass.display=='bank')){
      await this.money.postBankCode();
      this.share.hideLoading();
      if(this.money.bankCode) this.toBank(this.money.bankCode);
    }else if(this.money.payClass.display=='yinlian'){
      await this.money.postUnionCode();
      this.share.hideLoading();
      if(this.money.unionCode) this.presentModal('' + this.money.unionCode.data.url, '银联充值');
    }else if(this.money.payClass.display=='baidu'){
      await this.money.postBaiduCode();
      this.share.hideLoading();
      if(this.money.baiduCode) this.presentModal(this.money.baiduCode.data.break_url, '百度钱包');
    }else if(this.money.payClass.display=='qq'){
      await this.money.postQQCode();
      this.share.hideLoading();
      if(this.money.QQCode) this.presentModal(this.money.QQCode.data.break_url, 'QQ钱包');
    }
  }

  toAliPay(data){
    if(data.deposit_mode =="mc" || data.deposit_mode =="juxin"){
      window.open(data.data.break_url, '_blank');
    } else {
      this.presentModal(data.data.break_url, '支付宝');
    }
  }

  toBank(data){
    if (data.data.break_url) {
      window.open(data.data.break_url, '_blank');
    } else {
      this.navCtrl.push('CardComfirmPage', {data: data});
    }
  }

  presentModal(data, title) {
    let profileModal = this.modalCtrl.create('CodeComfirmPage', {data:data, title:title});
    profileModal.present();
  }

  checkInput(data, min, max) {
    if (!data.amount) {
      this.share.showToast('请输入金额');
    } else if (+data.amount < min) {
      this.share.showToast('最低充值' + min);
    } else if (+data.amount > max) {
      this.share.showToast('最高充值' + max);
    }
    this.result = data.amount && (+data.amount >= min) && (+data.amount <= max);
  }

  dismiss() {
    this.viewCtrl.dismiss({'foo': 'bar'});
  }

  pushPage(page) {
    if (page) this.navCtrl.push(page);
  }
}
