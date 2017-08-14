import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  constructor(public modalCtrl: ModalController, public fb: FormBuilder, public navCtrl: NavController,public navParams: NavParams) {
    this.LoginForm = fb.group({
      username: ['', Validators.pattern(/(^[a-zA-Z][\w\d]{2,19}$)|(^1[0-9]{10}$)|(^[a-zA-Z0-9][a-zA-Z0-9_\.\-]*\@[a-zA-Z0-9][a-zA-Z0-9\-]*(\.[a-zA-Z0-9]{2,4}){1,3}$)/)],
      password: ['', Validators.pattern(/^[a-zA-Z0-9`\-=\[\];,./~!@#$%^*()_+}{:?]{6,16}$/)]
    });
  }






}
