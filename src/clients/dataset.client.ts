import fetch from "node-fetch";
import { plainToInstance } from "class-transformer";
import { Player } from "../entities/player.entity";
import { DatasetFetchError } from "../exceptions/dataset-fetch-error";
import validator from "validator";

class DataSetPayload {
  players: Player[] = [];
}

/**
 * DataSetClient
 * A proxy to provider api
 */
export class DataSetClient {
  constructor(readonly sourceUrl: string) {
    if (!validator.isURL(sourceUrl)) {
      throw new Error(
        "DataSetClient: Invalid constructor argument. invalid URL"
      );
    }
  }

  /**
   * fetch Players stats data from provider api
   * @returns DataSetPayload|never
   */
  public async fetch(): Promise<DataSetPayload | never> {
    try {
      const response = await fetch(this.sourceUrl);

      if (!response.ok) {
        throw new DatasetFetchError(
          `fetch failed. api returned ${response.status} status code`
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const raw = await response.json();
      //TODO: behaviour will be more safe with a JSON schema validation.
      return plainToInstance<DataSetPayload, any>(DataSetPayload, raw);
    } catch (error) {
      if (error instanceof DatasetFetchError) {
        console.error("*** ERROR ***", error.message);
        throw error;
      } else {
        // unhandled error details should be logged for diagnosis
        console.error("*** ERROR ***", [error.message, error.stack].join("\n"));
        // error may be thrown and displayed to public users
        throw new DatasetFetchError();
      }
    }
  }
}
