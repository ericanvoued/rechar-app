import { Component } from '@angular/core';

/**
 * Generated class for the GlobalPageFooterComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'global-page-footer',
  templateUrl: 'global-page-footer.html'
})
export class GlobalPageFooterComponent {

  text: string;

  constructor() {
    console.log('Hello GlobalPageFooterComponent Component');
    this.text = 'Hello World';
  }

}
