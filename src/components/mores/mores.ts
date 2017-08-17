import { Component } from '@angular/core';

/**
 * Generated class for the MoresComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'mores',
  templateUrl: 'mores.html'
})
export class MoresComponent {

  text: string;

  constructor() {
    console.log('Hello MoresComponent Component');
    this.text = 'Hello World';
  }

}
