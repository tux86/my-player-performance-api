import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { BaseHttpError } from './base-http.error';

/**
 * HttpNotFoundError
 */
export class HttpNotFoundError extends BaseHttpError {
  constructor(message: ReasonPhrases | string = ReasonPhrases.NOT_FOUND) {
    super(message, StatusCodes.NOT_FOUND);
  }
}
