import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { BaseHttpError } from "./base-http.error";

/**
 * HttpBadRequestError
 */
export class HttpBadRequestError extends BaseHttpError {
  constructor(
    message: ReasonPhrases | string = ReasonPhrases.BAD_REQUEST,
    statusCode: StatusCodes = StatusCodes.BAD_REQUEST
  ) {
    super(message, statusCode);
  }
}
