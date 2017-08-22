import {Injectable} from '@angular/core';
import {GlobalShareProvider} from "../global-share/global-share";
import {HttpClientProvider} from "../http-client/http-client";

@Injectable()
export class WebsidemessagesService {

  constructor(private share: GlobalShareProvider, private httpClient: HttpClientProvider) {

  }

  lettersListData = {data: {data: []}};

  async postRemoteServer() {
    let data = await this.httpClient.post('/mobileh5-station-letters/', {_token: this.share.user.token});
    this.lettersListData = data;
  }

  getRemoteServer(): any {
    return null;
  }

  getParameters(): any {
  }

  letterDetail = {data: {data: []}};

  async getDetail(id) {
    let data = await this.httpClient.get(`/mobileh5-station-letters/${id}/view`);
    this.letterDetail = data;
  }


  parameters: any;
}
