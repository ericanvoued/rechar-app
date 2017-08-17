import { Component } from '@angular/core';

/**
 * Generated class for the NoDataRemindComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'no-data-remind',
  templateUrl: 'no-data-remind.html'
})
export class NoDataRemindComponent {

  text: string;

  constructor() {
    console.log('Hello NoDataRemindComponent Component');
    this.text = 'Hello World';
  }

}
