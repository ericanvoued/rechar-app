import { Injectable } from '@angular/core';
import {HttpClientProvider} from "../../http-client/http-client";


interface loginparamter {
  username:string,
  password:string
}

@Injectable()
export class LoginServiceProvider {

  constructor(private client:HttpClientProvider) {

  }
  loginAction(parameter:loginparamter):Promise<any>{
    return this.client.post('/mobile-h5-auth/login',parameter);
  }
}
