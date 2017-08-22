import {Injectable} from '@angular/core';
import {HttpClientProvider} from "../../http-client/http-client";
import {GlobalShareProvider} from "../../global-share/global-share";

@Injectable()
export class BetrecordDetailService {

  constructor(public http: HttpClientProvider, public share: GlobalShareProvider) {
  }

  postRemoteServer(): any {
    return this.http.get(`/mobileh5-projects/${this.getParameters().id}/view`);
  }

  detaidata: { data: { winning_number: any } } = {data: {winning_number: []}};

  async getRemoteServer() {
    let data = await this.http.get(`/mobileh5-projects/${this.getParameters().id}/view`);
    this.detaidata = data;
    this.detaidata.data.winning_number = this.detaidata.data.winning_number.replace(/\s+/g,'').split(' ');
  }

  betMoreDetailParameters: string;

  async betDetailMoreRemoteServer() {
    let data = await this.http.get(`/mobileh5-projects/batch-print-projects?project_ids=${this.betMoreDetailParameters}`);
    this.betDetailParametersData = data;

  }

  betDetailParameters: any;
  betDetailParametersData = {projects: []};

  getbetDetailParameters() {
    return this.betDetailParameters;
  }

  getParameters(): any {
    return this.parameters;
  }

  setParameters(id) {
    this.parameters.id = id;
    return this.getRemoteServer();
  }

  setParametersMerge(id) {
    this.parameters.id = id;
    return this.postRemoteServer();
  }

  parameters = {id: 0};
}
