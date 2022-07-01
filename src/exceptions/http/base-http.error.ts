import { StatusCodes } from "http-status-codes";

/**
 * BaseHttpError
 * All HTTP exceptions classes should inherit this abstract class
 */
export abstract class BaseHttpError extends Error {
  public statusCode: StatusCodes;
  protected constructor(message: string, statusCode: StatusCodes) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}
