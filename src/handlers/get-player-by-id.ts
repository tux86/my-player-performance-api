import { APIGatewayEvent, ProxyHandler } from "aws-lambda";
import { errorToJSONResponse, formatJSONResponse } from "../libs/api-gateway";
import { HttpNotFoundError } from "../exceptions/http/http-not-found.error";
import { BaseHttpError } from "../exceptions/http/base-http.error";
import { HttpInternalServerError } from "../exceptions/http/http-internal-server.error";
import { container } from "../bootstrap";
const { playerService } = container;

/**
 *  get a player stats lambda handler
 */
export const handler: ProxyHandler = async (event: APIGatewayEvent) => {
  try {
    const { id } = event.pathParameters;

    const player = await playerService.getPlayerById(id);

    if (!player) {
      throw new HttpNotFoundError("player not found");
    }

    return formatJSONResponse(player);
  } catch (error) {
    if (error instanceof BaseHttpError) {
      return errorToJSONResponse(error);
    } else {
      // internal error details should be logged for diagnosis
      console.error("*** ERROR ***", [error.message, error.stack].join("\n"));
      return errorToJSONResponse(new HttpInternalServerError());
    }
  }
};
