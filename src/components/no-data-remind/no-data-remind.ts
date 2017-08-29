import {Component, Input} from '@angular/core';

@Component({
  selector: 'no-data-remind',
  templateUrl: 'no-data-remind.html'
})
export class NoDataRemindComponent {
  @Input() text:string;
  constructor() {}
}
