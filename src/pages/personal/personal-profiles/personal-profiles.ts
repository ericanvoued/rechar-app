import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-personal-profiles',
  templateUrl: 'personal-profiles.html',
})
export class PersonalProfilesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }




  pushPage(page,item?){
    if(page) this.navCtrl.push(page,item);
  }
}
