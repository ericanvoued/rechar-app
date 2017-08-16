import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GlobalShareProvider} from "../../providers/global-share/global-share";
import {LoginServiceProvider} from "../../providers/service/login-serice/login-service";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  LoginForm: FormGroup;
  debug = false;
  user: any;

  constructor(private loginservice: LoginServiceProvider, private share: GlobalShareProvider, public modalCtrl: ModalController, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.LoginForm = fb.group({
      username: ['', Validators.pattern(/(^[a-zA-Z][\w\d]{2,19}$)|(^1[0-9]{10}$)|(^[a-zA-Z0-9][a-zA-Z0-9_\.\-]*\@[a-zA-Z0-9][a-zA-Z0-9\-]*(\.[a-zA-Z0-9]{2,4}){1,3}$)/)],
      password: ['', Validators.pattern(/^[a-zA-Z0-9`\-=\[\];,./~!@#$%^*()_+}{:?]{6,16}$/)]
    });
    this.memoryLogin();
  }

  async login(localData) {
    let data = await this.loginservice.loginAction(localData);
    if (data.isSuccess) {
      this.clearAndStore(localData);
      this.navCtrl.setRoot('HomePage');
    } else {
      this.share.presentToast(data.Msg);
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
      this.share.presentToast('请完善资料后再提交');
    }
  }

  getFormData() {
    let {username, password} = this.LoginForm.controls;
    return {username: username.value, password: password.value};
  }

  memoryLogin() {
    if (this.checkTime())
      this.login(this.share.store.get("app_user"));
  }

  checkUser() {
    return !!this.share.store.get("app_user");
  }

  checkTime() {
    let timeBefore = localStorage.expired;
    let timeAfter = Date.now();
    if ((timeAfter - timeBefore) > 1800000)
      localStorage.expired = timeAfter;
    return (timeAfter - timeBefore) > 1800000;
  }
}
