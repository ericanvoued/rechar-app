import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tab-home',
  templateUrl: 'tab-home.html',
})
export class TabHomePage {

  @ViewChild('myTabs') tabRef: Tabs;
  tab1Root: any = "SpecialOfferPage";
  tab2Root: any = "GameRecordPage";
  tab3Root: any = "HomePage";
  tab4Root: any = "ManageCataloguePage";
  tab5Root: any = "PersonalProfilesPage";

  constructor(public navCtrl: NavController, public  navParams: NavParams) {
  }

  ionViewDidEnter() {
    let pageIndex = this.navParams.get('pageIndex');
    pageIndex ? this.tabRef.select(pageIndex) : this.tabRef.select(2);
  }

}
