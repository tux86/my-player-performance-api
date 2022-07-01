import { ProxyHandler } from 'aws-lambda';
import { container } from '../bootstrap';
import { PlayerService } from '../services/player.service';
const playerService = container.get(PlayerService);
import { errorToJSONResponse, formatJSONResponse } from '../libs/api-gateway';
import { BaseHttpError } from '../exceptions/http/base-http.error';
import { HttpInternalServerError } from '../exceptions/http/http-internal-server.error';

/**
 *  lambda handler: list all players stats
 */
export const handler: ProxyHandler = async () => {
  try {
    const players = await playerService.getAllPlayers();
    return formatJSONResponse(players);
  } catch (error) {
    if (error instanceof BaseHttpError) {
      return errorToJSONResponse(error);
    } else {
      // internal error details should be logged for diagnosis
      console.error('*** ERROR ***', [error.message, error.stack].join('\n'));
      return errorToJSONResponse(new HttpInternalServerError());
    }
  }
};
