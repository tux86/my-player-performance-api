import fetch from 'node-fetch';
import { plainToInstance } from 'class-transformer';
import { StatsDataProviderError } from '../exceptions/stats-data-provider.error';
import { StatsResultDto } from '../dtos/stats-result.dto';
import { Service } from 'diod';
import { Config } from '../config';
import validator from 'validator';

/**
 * StatsDataProvider
 */
@Service()
export class StatsDataProvider {
  readonly dataSourceUrl: string;

  private readonly contentType = 'application/json';

  constructor(readonly config: Config) {
    if (!validator.isURL(config.dataSourceUrl)) {
      throw new Error('data source URL is not valid');
    }
    this.dataSourceUrl = config.dataSourceUrl;
  }

  /**
   * fetch Players stats data from provider api
   * @returns StatsResultDto|never
   */
  public async fetchData(): Promise<StatsResultDto | never> {
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
      //TODO: JSON schema validation can be added here.
      return plainToInstance(StatsResultDto, raw);
    } catch (error) {
      if (error instanceof StatsDataProviderError) {
        throw error;
      } else {
        throw new StatsDataProviderError();
      }
    }
  }
}
