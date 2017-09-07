import {Injectable} from '@angular/core';
import {GameconfigServiceProvider} from "../../../providers/service/games/gameconfig-service/gameconfig-service";
import {GlobalShareProvider} from "../../../providers/global-share/global-share";
import {SubBusinessToolProvider} from "./sub-business-tool";
import {HttpClientProvider} from "../../../providers/http-client/http-client";

@Injectable()
export class SubCameconfigServiceProvider extends GameconfigServiceProvider {
  constructor(public share: GlobalShareProvider, public businessTool: SubBusinessToolProvider, public httpclient: HttpClientProvider) {
    super(share, businessTool, httpclient);
  }
  setdefaultsMethodData() {

    let df = this.businessTool.setDefaultsMethod(this.methedsList.game_ways, this.defaultData.data && this.defaultData.data.default_method_id, this.defaultData);
    if (df) {
      this.defaultsMethodData = df;
    }
  }

}
