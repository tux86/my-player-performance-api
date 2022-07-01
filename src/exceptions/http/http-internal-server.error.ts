import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { BaseHttpError } from './base-http.error';

/**
 * HttpInternalServerError
 */
export class HttpInternalServerError extends BaseHttpError {
  constructor(
    message: ReasonPhrases | string = ReasonPhrases.INTERNAL_SERVER_ERROR
  ) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
