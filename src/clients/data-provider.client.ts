import fetch from "node-fetch";
import { plainToInstance } from "class-transformer";
import { DataProviderClientError } from "../exceptions/data-provider-client.error";
import validator from "validator";
import { DataPayload } from "../types/data-payload.class";
import { Service } from "diod";
import { Config } from "../config";

/**
 * DataProviderClient
 * A proxy to provider api
 */
@Service()
export class DataProviderClient {
  readonly dataSetUrl: string;
  constructor(readonly config: Config) {
    if (!validator.isURL(config.dataSetUrl)) {
      throw new Error("DataProviderClient:  invalid DataSet URL");
    }
    this.dataSetUrl = config.dataSetUrl;
  }

  /**
   * fetch Players stats data from provider api
   * @returns DataPayload|never
   */
  public async fetchData(): Promise<DataPayload | never> {
    try {
      const response = await fetch(this.dataSetUrl);

      if (!response.ok) {
        throw new DataProviderClientError(
          `fetch failed. api returned ${response.status} status code`
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const raw = await response.json();
      //TODO: behaviour will be more safe with a JSON schema validation.
      return plainToInstance<DataPayload, any>(DataPayload, raw);
    } catch (error) {
      if (error instanceof DataProviderClientError) {
        console.error("*** ERROR ***", error.message);
        throw error;
      } else {
        // unhandled error details should be logged for diagnosis
        console.error("*** ERROR ***", [error.message, error.stack].join("\n"));
        // error may be thrown and displayed to public users
        throw new DataProviderClientError();
      }
    }
  }
}
