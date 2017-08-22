import { Component } from '@angular/core';
import {IonicPage, NavController, ViewController} from 'ionic-angular';
import {MydepositService} from "../../../providers/service/bank-mix/mydeposit-service";

@IonicPage()
@Component({
  selector: 'page-recharge-detail',
  templateUrl: 'recharge-detail.html',
})
export class RechargeDetailPage {
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public mydepositService: MydepositService) {
    this.viewCtrl.didEnter.subscribe(data => this.mydepositService.postRemoteServer());
  }

  nodataremind = "没有任何充提记录";

  mapName = {1: "在线充值", 18: "人工充值", 36: "人工充值-掉单", 2: "提取现金", 19: "管理员提现"};

  ionViewDidLoad() {

  }

  changenodataremind(txt) {
    this.nodataremind = txt;
  }
  go(page){
    this.navCtrl.push(page);
  }

}
