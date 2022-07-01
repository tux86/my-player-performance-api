import fetch from "node-fetch";
import { plainToInstance } from "class-transformer";
import { DatasetClientFetchError } from "../exceptions/dataset-client-fetch.error";
import validator from "validator";
import { DataSetPayload } from "../types/dataset-payload.class";
import { Service } from "diod";
import config from "../config";
const dataSetUrl = config.dataSetUrl;
/**
 * DataSetClient
 * A proxy to provider api
 */
@Service()
export class DataSetClient {
  readonly dataSetUrl: string;
  constructor() {
    if (!validator.isURL(dataSetUrl)) {
      throw new Error("DataSetClient:  invalid DataSet URL");
    }
    this.dataSetUrl = dataSetUrl;
  }

  /**
   * fetch Players stats data from provider api
   * @returns DataSetPayload|never
   */
  public async fetch(): Promise<DataSetPayload | never> {
    try {
      const response = await fetch(this.dataSetUrl);

      if (!response.ok) {
        throw new DatasetClientFetchError(
          `fetch failed. api returned ${response.status} status code`
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const raw = await response.json();
      //TODO: behaviour will be more safe with a JSON schema validation.
      return plainToInstance<DataSetPayload, any>(DataSetPayload, raw);
    } catch (error) {
      if (error instanceof DatasetClientFetchError) {
        console.error("*** ERROR ***", error.message);
        throw error;
      } else {
        // unhandled error details should be logged for diagnosis
        console.error("*** ERROR ***", [error.message, error.stack].join("\n"));
        // error may be thrown and displayed to public users
        throw new DatasetClientFetchError();
      }
    }
  }
}
