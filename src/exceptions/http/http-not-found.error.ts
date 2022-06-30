import { StatusCodes } from "http-status-codes";
import { BaseHttpError } from "./base-http.error";

export class HttpNotFoundError extends BaseHttpError {
  constructor(message = "not found") {
    super(message, StatusCodes.NOT_FOUND);
  }
}
