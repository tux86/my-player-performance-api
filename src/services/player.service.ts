import { Player } from '../dtos/player.dto';
import { StatsDataProvider } from '../providers/stats-data.provider';
import { HttpBadRequestError } from '../exceptions/http';
import validator from 'validator';
import { Service } from 'diod';
import isNumeric = validator.isNumeric;

@Service()
export class PlayerService {
  constructor(readonly client: StatsDataProvider) {}

  /**
   * get list of players sorted by their ID
   * @returns Player[] | never
   */
  async getAllPlayers(): Promise<Player[] | never> {
    const response = await this.client.fetchData();
    const { players } = response;
    return players.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  /**
   * get a player by id
   * @param id string
   * @returns Player | undefined | never
   */
  public async getPlayerById(id: string): Promise<Player | undefined | never> {
    if (!id || !isNumeric(id, { no_symbols: true })) {
      throw new HttpBadRequestError('Invalid "Id" parameter');
    }

    const players = await this.getAllPlayers();
    return players.find((player) => player.id === Number(id));
  }
}
