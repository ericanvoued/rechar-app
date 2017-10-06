import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GlobalShareProvider} from "../../providers/global-share/global-share";
import {LoginServiceProvider} from "../../providers/service/login-serice/login-service";
import * as md5 from 'md5';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  LoginForm: FormGroup;
  debug = false;
  user: any;

  constructor(private logins: LoginServiceProvider, private share: GlobalShareProvider, public modalCtrl: ModalController, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.LoginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.pattern(/^[a-zA-Z0-9`\-=\[\];,./~!@#$%^*()_+}{:?]{6,16}$/)]
    });
    this.memoryLogin();
  }

  async login(localData) {
    this.share.showLoading("正在登陆中....");
    let data = await this.logins.loginApp(localData);
    if (data.isSuccess) {
      this.share.user = data.data;
      this.clearAndStore(localData);
      this.navCtrl.setRoot('TabHomePage');
    } else {
      this.share.showToast(data.Msg,3000);
    }
  }

  clearAndStore(data) {
    this.LoginForm.reset();
    this.share.store.set("app_user", data);
    localStorage.expired = Date.now();
  }

  formLogin() {
    if (this.LoginForm.valid) {
      this.login(this.getFormData());
    } else {
      this.share.showToast('请完善资料后再提交',3000);
    }
  }

  getFormData() {
    let {username, password} = this.LoginForm.controls;
    return {
      username: username.value,
      password: md5(md5(md5(username.value + password.value)))
    }
  }

  memoryLogin() {
    if (this.checkTime()) this.login(this.share.store.get("app_user"));
  }

  checkTime() {
    let timeBefore = localStorage.expired;
    let timeAfter = Date.now();
    if (!timeBefore) timeBefore = 0;
    if ((timeAfter - timeBefore) > 1800000)
      localStorage.expired = timeAfter;
    return (timeAfter - timeBefore) > 1800000;
  }
}
