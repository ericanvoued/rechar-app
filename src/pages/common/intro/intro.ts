import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, Slides} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  @ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController) {

  }

  slideOptions = {
    initialSlide: 0,
    loop: false,
    autoplay: 4000,
    pager: true
  };

  ngAfterViewInit() {

  }
  slideNext(){
    this.slides.slideNext();
  }
  goToHome(): void {
    this.navCtrl.setRoot("TabHomePage");
  }

}
