import { ProxyHandler } from "aws-lambda";
import { container } from "../bootstrap";
const { playerService } = container;

import { errorToJSONResponse, formatJSONResponse } from "../libs/api-gateway";
import { BaseHttpError } from "../exceptions/http/base-http.error";
import { HttpInternalServerError } from "../exceptions/http/http-internal-server.error";

/**
 *  list all players stats lambda handler
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
      console.error("*** ERROR ***", [error.message, error.stack].join("\n"));
      return errorToJSONResponse(new HttpInternalServerError());
    }
  }
};
