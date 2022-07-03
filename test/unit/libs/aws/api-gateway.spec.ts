import {
  errorToJSONResponse,
  formatJSONResponse,
} from '../../../../src/libs/aws/api-gateway';
import { expect } from 'chai';
import { HttpNotFoundError } from '../../../../src/exceptions/http';

describe('libs/aws/ApiGateway', () => {
  // formatJSONResponse
  describe('formatJSONResponse', () => {
    it('should return a JSON payload with default status code', () => {
      const result = formatJSONResponse({ hello: 'hello world' });
      expect(result).to.be.an('object');
      expect(result).have.property('statusCode', 200);
      expect(result).have.property(
        'body',
        JSON.stringify({ hello: 'hello world' }),
      );
    });
    it('should return a JSON payload with provided 204 No Content status code', () => {
      const result = formatJSONResponse(null, 204);
      expect(result).to.be.an('object');
      expect(result).have.property('statusCode', 204);
      expect(result).have.property('body', JSON.stringify(null));
    });
  });

  // errorToJSONResponse
  describe('errorToJSONResponse', () => {
    it('should return a JSON payload with http exception', () => {
      const result = errorToJSONResponse(new HttpNotFoundError('not_found'));
      expect(result).to.be.an('object');
      expect(result).have.property('statusCode', 404);
      expect(result).have.property(
        'body',
        JSON.stringify({ statusCode: 404, errorMessage: 'not_found' }),
      );
    });

    it('should return a JSON payload with unexpected Error', () => {
      const result = errorToJSONResponse(new Error('unexpected error'));
      expect(result).to.be.an('object');
      expect(result).have.property('statusCode', 500);
      expect(result).have.property(
        'body',
        JSON.stringify({ statusCode: 500, errorMessage: 'unexpected error' }),
      );
    });
  });
});
