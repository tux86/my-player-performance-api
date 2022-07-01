import { formatJSONResponse, errorToJSONResponse } from "../../src/libs/api-gateway";
import { expect } from "chai";
import "mocha";
import {HttpNotFoundError} from "../../src/exceptions/http/http-not-found.error";

describe("API Gateway Response Payload", () => {
  describe("formatJSONResponse", () => {
    it("should return valid JSON response with default status code", () => {
      const result = formatJSONResponse({ hello: "hello world" });
      expect(result).to.be.an("object");
      expect(result).have.property("statusCode", 200);
      expect(result).have.property(
        "body",
        JSON.stringify({ hello: "hello world" })
      );
    });
    it("should return valid JSON response with provided 204 No Content status code", () => {
      const result = formatJSONResponse(null, 204);
      expect(result).to.be.an("object");
      expect(result).have.property("statusCode", 204);
      expect(result).have.property("body", JSON.stringify(null));
    });
  });


  describe("errorToJSONResponse", () => {
    it("should return valid JSON response with http exception", () => {
      const result = errorToJSONResponse(new HttpNotFoundError('not_found'));
      expect(result).to.be.an("object");
      expect(result).have.property("statusCode", 404);
      expect(result).have.property(
        "body",
        JSON.stringify({ statusCode: 404, errorMessage: "not_found" })
      );
    });

    it("should return valid JSON response with unexpected Error", () => {
      const result = errorToJSONResponse(new Error('unexpected error'));
      expect(result).to.be.an("object");
      expect(result).have.property("statusCode", 500);
      expect(result).have.property(
          "body",
          JSON.stringify({ statusCode: 500, errorMessage: "unexpected error" })
      );
    });
  });
});
