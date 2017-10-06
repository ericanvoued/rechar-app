import {Injectable} from '@angular/core';
import {HttpClientProvider} from "../../http-client/http-client";

interface loginParameter {
  username: string,
  password: string
}

@Injectable()
export class LoginServiceProvider {
  constructor(private client: HttpClientProvider) {}

  loginApp(parameter: loginParameter): Promise<any> {
    return this.client.post('/mobile-h5-auth/login', parameter);
  }
}
