import fetch from 'node-fetch';
import { plainToInstance } from 'class-transformer';
import { StatsDataProviderError } from '../exceptions/stats-data-provider.error';
import { DataPayload } from '../types/data-payload.class';
import { Service } from 'diod';
import { Config } from '../config';
import {
  BaseHttpDataProvider,
  HttpDataProvider,
} from '../interfaces/http-data-provider';

/**
 * StatsDataProvider
 * A proxy to provider api
 */
@Service()
export class StatsDataProvider
  extends BaseHttpDataProvider
  implements HttpDataProvider
{
  private readonly contentType = 'application/json';

  constructor(readonly config: Config) {
    super(config.dataSourceUrl);
  }

  /**
   * fetch Players stats data from provider api
   * @returns DataPayload|never
   */
  public async fetchData(): Promise<DataPayload | never> {
    try {
      const response = await fetch(this.dataSourceUrl);

      // validate status code
      if (!response.ok) {
        throw new StatsDataProviderError(
          `fetch failed. api returned ${response.status} status code`,
        );
      }

      // validate content type
      if (!response.headers.get('content-type').includes(this.contentType)) {
        throw new StatsDataProviderError('invalid content type');
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const raw = await response.json();
      //TODO: behaviour will be more safe with a JSON schema validation.
      return plainToInstance<DataPayload, any>(DataPayload, raw);
    } catch (error) {
      if (error instanceof StatsDataProviderError) {
        console.error('*** ERROR ***', error.message);
        throw error;
      } else {
        // unhandled error details should be logged for diagnosis
        console.error('*** ERROR ***', [error.message, error.stack].join('\n'));
        // error may be thrown and displayed to public users
        throw new StatsDataProviderError();
      }
    }
  }
}
