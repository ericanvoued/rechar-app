import { Component } from '@angular/core';

/**
 * Generated class for the GamerecordComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'gamerecord',
  templateUrl: 'gamerecord.html'
})
export class GamerecordComponent {

  text: string;

  constructor() {
    console.log('Hello GamerecordComponent Component');
    this.text = 'Hello World';
  }

}
