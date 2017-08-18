
import {IonicErrorHandler} from "ionic-angular";
export class MyExceptionHandler implements IonicErrorHandler{
  constructor() {
  }

  handleError(err: any): void {
    console.log(err);
  }
}
