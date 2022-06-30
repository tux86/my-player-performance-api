import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { BaseHttpError } from "./base-http.error";

export class HttpNotFoundError extends BaseHttpError {
  constructor(message = ReasonPhrases.NOT_FOUND) {
    super(message, StatusCodes.NOT_FOUND);
  }
}
