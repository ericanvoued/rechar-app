import { Component } from '@angular/core';

/**
 * Generated class for the MyPopOverComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'my-pop-over',
  templateUrl: 'my-pop-over.html'
})
export class MyPopOverComponent {

  text: string;

  constructor() {
    console.log('Hello MyPopOverComponent Component');
    this.text = 'Hello World';
  }

}
