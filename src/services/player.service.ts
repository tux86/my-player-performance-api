import { Player } from "../entities/player.entity";
import { DataSetClient } from "../clients/dataset.client";
import { HttpBadRequestError } from "../exceptions/http/http-bad-request.error";
import validator from "validator";
import isNumeric = validator.isNumeric;
import { Service } from "diod";

@Service()
export class PlayerService {
  constructor(readonly dataSetClient: DataSetClient) {}

  async getAllPlayers(): Promise<Player[] | never> {
    const data = await this.dataSetClient.fetch();
    const { players } = data;
    // return players sorted by id (direction=ASC)
    return players.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  public async getPlayerById(id: string): Promise<Player | undefined | never> {
    if (!id || !isNumeric(id, { no_symbols: true })) {
      throw new HttpBadRequestError(`Invalid "Id" parameter`);
    }

    const players = await this.getAllPlayers();
    return players.find((player) => player.id === Number(id));
  }
}
