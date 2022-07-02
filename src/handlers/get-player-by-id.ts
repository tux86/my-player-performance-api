import { APIGatewayEvent, ProxyHandler } from 'aws-lambda';
import {
  errorToJSONResponse,
  formatJSONResponse,
} from '../libs/aws/api-gateway';
import {
  BaseHttpError,
  HttpInternalServerError,
  HttpNotFoundError,
} from '../exceptions/http';
import { container } from '../bootstrap';
import { PlayerService } from '../services/player.service';

const playerService = container.get(PlayerService);

/**
 *  lambda handler : get a player stats
 */
export const handler: ProxyHandler = async (event: APIGatewayEvent) => {
  try {
    const { id } = event.pathParameters;

    const player = await playerService.getPlayerById(id);

    if (!player) {
      throw new HttpNotFoundError('player not found');
    }

    return formatJSONResponse(player);
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
