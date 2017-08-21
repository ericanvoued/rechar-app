import {Component} from '@angular/core';
import {
  IonicPage, LoadingController, ModalController, NavController, NavParams, ToastController,
  ViewController
} from 'ionic-angular';
import {Config} from "../../../config/config";
import {GlobalShareProvider} from "../../../providers/global-share/global-share";
import {TopupServiceProvider} from "../../../providers/service/bank-mix/topup-service/topup-service";

/**
 * Generated class for the RechargePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recharge',
  templateUrl: 'recharge.html',
})
export class RechargePage {


  bankcardIconMap = Config.bankcardIconMap;

  constructor(public loadingCtrl: LoadingController, public sharebankcarddetail: GlobalShareProvider, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController, public navCtrl: NavController, public topupService: TopupServiceProvider, public toastCtrl: ToastController) {
    this.fetchData();
  }

  async fetchData() {
    let data = await this.topupService.getbanks_tabs()
    Object.assign(this.tabsItemSwith, data.data);
  }

  tabsItemSwith = {
    alipay: 0,
    baidu: 0,
    bank: 0,
    bankkj: 0,
    qq: 0,
    weixin: 0,
    yinlian: 0
  }
  unionpayInitData: any;

  /**
   * baidu charege
   */
  async baiduRecharge() {
    if (!this.validateData(this.topupService.postBaiduRechargeParameter)) return;
    this.showLoading();
    let data = await this.topupService.postBaiduRechargeRemoteServer();
    this.jumpUrlFormCode(data, '百度钱包')
  }

  /**
   * qq recharege
   */
  async qqRecharge() {
    if (!this.validateData(this.topupService.postQQRechargeParameter)) return;
    this.showLoading();
    let data = await this.topupService.postQQRechargeRemoteServer();
    this.jumpUrlFormCode(data, 'QQ钱包');
  }

  loading: any;

  hideLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }

  showLoading() {
    if (!this.loading) {
      this.loading = this.loadingCtrl.create({
        spinner: 'bubbles'
      });
      this.loading.present();
    }
  }

  async unionpayInit() {
    let data = await this.topupService.getUnionPay();
    this.unionpayInitData = data;
  }

  unionpayProcessing = false;

  /**
   * 银联充值
   *
   */
  async unionpaySubmit() {
    if (!this.validateData4()) {
      return;
    }
    if (this.unionpayProcessing) return;
    this.unionpayProcessing = true;

    let loading = this.loadingCtrl.create({
      spinner: 'bubbles'
    });

    loading.present();

    let data = await this.topupService.unionPayComfirm();
    loading.dismiss();
    this.unionpayProcessing = false;
    if (data.isSuccess) {
      let form = '' + data.data.url;
      this.postunionpayPayment(form);
    } else {
      this.showToast(data.Msg);
    }

  }

  post: any;

  validateData4(): boolean {
    let data = this.topupService.unionPayComfirmParameter;
    let mostAmout = (+(this.unionpayInitData && this.unionpayInitData.data.fMaxLoad)) || 45000;

    if (!data.amount) {
      this.showToast('请输入金额');
      return false;
    } else if (+data.amount < 2) {
      this.showToast('最低充值2');
      return false;
    } else if (+data.amount > mostAmout) {
      this.showToast('最高充值' + mostAmout);
      return false;
    }
    return true;
  }

  postunionpayPayment(data) {
    this.presentProfileModal(data, '银联充值', undefined, true);
  }

  private jumpUrlFormCode(data: any, title: string) {
    this.hideLoading();
    if (data.isSuccess) {
      this.presentProfileModalFormCode(data.data.break_url, title, true);
    } else {
      this.showToast(data.Msg);
    }
  }

  presentProfileModalFormCode(data, title: string, isQQBaidu: boolean) {
    let profileModal = this.modalCtrl.create("WechatpayResultPage", {data, title, isQQBaidu});
    profileModal.present();
  }

  presentProfileModal(data, title: string, url?: string, isform?: boolean) {
    let profileModal = this.modalCtrl.create("WechatpayResultPage", {data, title, url, isform});
    profileModal.present();
  }

  goSelectBank() {
    if (this.bankcardlist.length) {
      this.navCtrl.push("SelectBankPage", {data: this.bankcardlist, isbankcard: this.isbankcard});
    }
  }

  ionViewDidLoad() {

  }

  ionViewDidEnter() {

  }

  dismiss() {
    let data = {'foo': 'bar'};
    this.viewCtrl.dismiss(data);
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

  validateData(data): boolean {
    if (!data.amount) {
      this.showToast('请输入金额');
      return false;
    } else if (+data.amount < 2) {
      this.showToast('最低充值2');
      return false;
    } else if (+data > 45000) {
      this.showToast('最高充值45000');
      return false;
    }
    return true;
  }

  showQR(data) {
    this.hideLoading();
    if (data.isSuccess) {

      if (/weixin:\/\//.test(data.data.break_url)) {
        let profileModal = this.modalCtrl.create('WechatpayResultPage', {
          data: data.data.break_url,
          title: "微信充值",
          isQQBaidu: true
        });
        profileModal.present();
        // window.open(data.data.break_url);
      } else {
        let template = `<img src="${data.data.break_url}" />`;
        this.postWechatPayment(template, data.data.break_url);
      }

    } else {
      this.showToast(data.Msg);
    }

  }

  /**
   * 微信
   */
  async rechargeByWechat() {
    if (!this.validateData(this.topupService.postWeixinRechargeParameter)) return;
    this.showLoading();

    let data = await this.topupService.postWeixinRechargeRemoteServer();
    this.showQR(data);
  }

  /**
   * 支付宝
   */
  async rechargeByAlipay() {
    if (!this.validateData(this.topupService.postAlipayRechargeParameter)) return;
    this.showLoading();
    let data = await this.topupService.postAlipayRechargeRemoteServer();
    this.jumpUrl(data);
  }

  jumpUrl(data) {
    this.hideLoading();
    if (data.isSuccess) {
      if (data.deposit_mode == "mc" || data.deposit_mode == "juxin") {
        this.jumpAction(data.data.break_url);
      } else {
        this.jumpUrlFormCode(data, '支付宝');
      }
    } else {
      this.showToast(data.Msg);
    }
  }

  jumpAction(url) {
    window.open(url, '_blank');
  }

  /**
   * 快捷和银行支付相关
   * @param rs
   */
  bankcardlist = [{
    "id": 25,
    "name": "中国工商银行",
    "min": "2.00",
    "max": "190000.00",
    "text": "单日充值总额无上限",
    "is_mbank": false,
    "userAccountList": []
  }, {
    "id": 26,
    "name": "中国建设银行",
    "min": "2.00",
    "max": "45000.00",
    "text": "单日充值总额无上限",
    "is_mbank": false,
    "userAccountList": []
  }, {
    "id": 27,
    "name": "中国农业银行",
    "min": "2.00",
    "max": "45000.00",
    "text": "单日充值总额无上限",
    "is_mbank": false,
    "userAccountList": []
  }, {
    "id": 28,
    "name": "中国银行",
    "min": "2.00",
    "max": "45000.00",
    "text": "单日充值总额无上限",
    "is_mbank": false,
    "userAccountList": []
  }, {
    "id": 29,
    "name": "招商银行",
    "min": "2.00",
    "max": "45000.00",
    "text": "单日充值总额无上限",
    "is_mbank": false,
    "userAccountList": []
  }, {
    "id": 30,
    "name": "中国交通银行",
    "min": "2.00",
    "max": "45000.00",
    "text": "单日充值总额无上限",
    "is_mbank": false,
    "userAccountList": []
  }, {
    "id": 31,
    "name": "中国民生银行",
    "min": "2.00",
    "max": "45000.00",
    "text": "单日充值总额无上限",
    "is_mbank": false,
    "userAccountList": []
  }, {
    "id": 32,
    "name": "中信银行",
    "min": "2.00",
    "max": "45000.00",
    "text": "单日充值总额无上限",
    "is_mbank": false,
    "userAccountList": []
  }, {
    "id": 33,
    "name": "上海浦东发展银行",
    "min": "2.00",
    "max": "45000.00",
    "text": "单日充值总额无上限",
    "is_mbank": false,
    "userAccountList": []
  }, {
    "id": 34,
    "name": "广东发展银行",
    "min": "2.00",
    "max": "45000.00",
    "text": "单日充值总额无上限",
    "is_mbank": false,
    "userAccountList": []
  }, {
    "id": 35,
    "name": "平安银行",
    "min": "2.00",
    "max": "45000.00",
    "text": "单日充值总额无上限",
    "is_mbank": false,
    "userAccountList": []
  }, {
    "id": 37,
    "name": "兴业银行",
    "min": "2.00",
    "max": "45000.00",
    "text": "单日充值总额无上限",
    "is_mbank": false,
    "userAccountList": []
  }, {
    "id": 38,
    "name": "华夏银行",
    "min": "2.00",
    "max": "45000.00",
    "text": "单日充值总额无上限",
    "is_mbank": false,
    "userAccountList": []
  }, {
    "id": 39,
    "name": "中国光大银行",
    "min": "2.00",
    "max": "45000.00",
    "text": "单日充值总额无上限",
    "is_mbank": false,
    "userAccountList": []
  }, {
    "id": 40,
    "name": "中国邮政储蓄银行",
    "min": "2.00",
    "max": "45000.00",
    "text": "单日充值总额无上限",
    "is_mbank": false,
    "userAccountList": []
  }];
  isbankcard: boolean;

  async getQuiklyAndBackRechargePage(isbankcard) {

    this.isbankcard = isbankcard;

    let data = await this.topupService.getQuiklyAndBankRechargePage();

    if (data.isSuccess) {
      this.bankcardlist = data.data.banks;
    } else {
      this.showToast(data.Msg);
    }
  }

  bankcardamount: any;
  quiklyamount: any;

  validBankcardRecharge(isBank) {

    let c = isBank ? this.sharebankcarddetail.bankcardDetail2 : this.sharebankcarddetail.bankcardDetail;
    if (!c) {
      this.showToast('请选择银行卡');
      return false;
    }
    let mt = isBank ? this.bankcardamount : this.quiklyamount;
    let isvalied = this.validateData({amount: mt});
    if (isvalied) {
      this.topupService.postQuiklyAndBankRechargeParameter.amount = mt;
      this.topupService.postQuiklyAndBankRechargeParameter.bank = c.id;
    }

    return isvalied;
  }

  submitQuiklyAndBackRecharge() {

  }

  ComfirmBankRecharge(isBank) {
    this.isbankcard = isBank;
    if (!this.validBankcardRecharge(isBank)) return;

    let data: any = this.topupService.postQuiklyAndBankRecharge(isBank);
    if (data.isSuccess) {
      window.open(data.data.break_url, '_blank');
    } else {
      this.showToast(data.Msg);
    }

  }

  async ComfirmQuiklyAndBackRecharge(isBank) {
    this.isbankcard = isBank;
    if (!this.validBankcardRecharge(isBank)) return;
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles'
    });
    loading.present();

    let data = await this.topupService.postQuiklyAndBankRecharge(isBank);
    loading.dismiss();

    if (data.isSuccess) {
      if (data.data.break_url) {
        window.open(data.data.break_url, '_blank');
      } else {
        this.navCtrl.push("BankcardRechargecomfirmPage", {data: data});
      }
    } else {
      this.showToast(data.Msg);
    }
    ;


  }

  postWechatPayment(rs, url?) {
    //let data = this.createPostForm(rs.data);
    this.presentProfileModal(rs, '微信充值', url);
  }

  createPostForm(data): string {
    return `
      <form id="wechat-postform" action="http://api.hyf-motor.com/paySubmit.php" method="post">
          <input type="hidden" name="input_charset" value="${data.input_charset}"/>
          <input type="hidden" name="notify_url" value="${data.notify_url}"/>
          <input type="hidden" name="return_url"  value="${data.return_url}"/>
          <input type="hidden" name="pay_type" value="${data.pay_type}"/>
          <input type="hidden" name="bank_code" value="${data.bank_code}"/>
          <input type="hidden" name="merchant_code" value="${data.merchant_code}"/>
          <input type="hidden" name="order_no" value="${data.order_no}"/>
          <input type="hidden" name="order_amount" value="${data.order_amount}"/>
          <input type="hidden" name="order_time" value="${data.order_time}"/>
          <input type="hidden" name="product_name" value="${data.product_name}"/>
          <input type="hidden" name="product_num" value="${data.product_num}"/>
          <input type="hidden" name="req_referer" value="${data.req_referer}"/>
          <input type="hidden" name="customer_ip" value="${data.customer_ip}"/>
          <input type="hidden" name="customer_phone" value="${data.customer_phone}"/>
          <input type="hidden" name="receive_address" value="${data.receive_address}"/>
          <input type="hidden" name="return_params" value="${data.return_params}"/>
          <input type="hidden" name="sign" value="${data.sign}"/>
    </form>
    `;
  }

}
