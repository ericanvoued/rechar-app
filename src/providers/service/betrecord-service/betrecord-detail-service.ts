import {Injectable} from '@angular/core';
import {HttpClientProvider} from "../../http-client/http-client";
import {GlobalShareProvider} from "../../global-share/global-share";

@Injectable()
export class BetrecordDetailService {
  bet_winning_number=[];

  constructor(public http: HttpClientProvider, public share: GlobalShareProvider) {}

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
    for(let i=0;i< this.betDetailParametersData.projects.length;i++){
      let str = this.betDetailParametersData.projects[i].winning_number;
      this.bet_winning_number=[];
      if (str) {
        if (/[,\s]+/.test(str))
          this.bet_winning_number= str.split(/[,\s]+/);
        else
          this.bet_winning_number = str.split('');
      }
      this.betDetailParametersData.projects[i].winning_number_group=JSON.parse(JSON.stringify(this.bet_winning_number));
    }






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
