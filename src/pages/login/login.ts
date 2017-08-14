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
    if(this.checkUser())
      this.login(this.share.store.get("app_user"));
    this.LoginForm = fb.group({
      username: ['', Validators.pattern(/(^[a-zA-Z][\w\d]{2,19}$)|(^1[0-9]{10}$)|(^[a-zA-Z0-9][a-zA-Z0-9_\.\-]*\@[a-zA-Z0-9][a-zA-Z0-9\-]*(\.[a-zA-Z0-9]{2,4}){1,3}$)/)],
      password: ['', Validators.pattern(/^[a-zA-Z0-9`\-=\[\];,./~!@#$%^*()_+}{:?]{6,16}$/)]
    });
  }

  checkUser() {
    return !!this.share.store.get("app_user");
  }

  async login(localData) {
    let data = await this.loginservice.loginAction({username: localData.username, password: localData.password});
    if (data.isSuccess) {
      this.clearAndStore(localData);
      this.navCtrl.setRoot('HomePage');
    } else {
      this.share.presentToast(data.Msg);
    }
  }

  clearAndStore(data){
    this.LoginForm.reset();
    this.share.store.set("app_user",data);
  }

  userLogin(){
    if (this.LoginForm.valid) {
      let data={username:this.LoginForm.controls.username.value,password:this.LoginForm.controls.password.value};
      this.login(data);
    } else {
      this.share.presentToast('请完善资料后再提交');
    }
  }

}
