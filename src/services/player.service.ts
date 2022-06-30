import { Player } from "../entities/player.entity";
import { DataSetClient } from "../clients/dataset.client";

export class PlayerService {
  constructor(readonly dataSetClient: DataSetClient) {}

  async getAllPlayers(): Promise<Player[]> {
    const data = await this.dataSetClient.fetch();
    const { players } = data;
    // return players sorted by id
    return players.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  public async getPlayerById(id: number): Promise<Player | undefined> {
    const players = await this.getAllPlayers();
    return players.find((player) => player.id === id);
  }
}
