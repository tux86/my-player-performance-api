import { StatusCodes } from "http-status-codes";
import { BaseHttpError } from "../exceptions/http/base-http.error";
import { APIGatewayProxyResult } from "aws-lambda";

// transform a payload to APIGatewayProxyResult
export const formatJSONResponse = (
  payload: any,
  statusCode: StatusCodes = StatusCodes.OK
): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify(payload),
  };
};

// transform Error to APIGatewayProxyResult
export const errorToJSONResponse = (
  error: Error | BaseHttpError
): APIGatewayProxyResult => {
  const statusCode = error instanceof BaseHttpError ? error.statusCode : 500;
  return formatJSONResponse(
    {
      message: error.message,
    },
    statusCode
  );
};
