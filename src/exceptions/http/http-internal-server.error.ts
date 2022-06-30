import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { BaseHttpError } from "./base-http.error";

export class HttpInternalServerError extends BaseHttpError {
  constructor(message = ReasonPhrases.INTERNAL_SERVER_ERROR) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
