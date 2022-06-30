import { DataSetClient } from "../clients/dataset.client";
import { PlayerService } from "../services/player.service";
import config from "../config";

/**
 * DI Container
 * TODO: simulating DependencyInjection container. Just to keep it simple (NOT FOR REAL PROJECT USE !!)
 */
export class Container {
  private _dataSetClient: DataSetClient;
  private _playerService: PlayerService;

  get dataSetClient(): DataSetClient {
    console.debug("> initializing DataSetClient");
    if (!this._dataSetClient) {
      this._dataSetClient = new DataSetClient(config.dataSetUrl);
    }
    return this._dataSetClient;
  }

  get playerService(): PlayerService {
    console.debug("> initializing PlayerService");
    if (!this._playerService) {
      this._playerService = new PlayerService(this.dataSetClient);
    }
    return this._playerService;
  }
}
