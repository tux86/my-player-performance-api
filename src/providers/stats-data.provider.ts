import { plainToInstance } from 'class-transformer';
import { StatsDataProviderError } from '../exceptions/stats-data-provider.error';
import { StatsResult } from '../dtos/stats-result.dto';
import { Service } from 'diod';
import { Config } from '../config';
import { validate } from 'class-validator';
import validator from 'validator';
import { logger } from '../libs/logger';
import { ClassValidationError } from '../exceptions/class-validation-error';

/**
 * StatsDataProvider
 */
@Service()
export class StatsDataProvider {
  readonly endpointUrl: string;

  private readonly contentType = 'application/json';

  constructor(readonly config: Config) {
    if (!validator.isURL(config.endpointUrl)) {
      throw new Error('endpoint URL is not valid');
    }
    this.endpointUrl = config.endpointUrl;
  }

  /**
   * fetch Players stats data from provider api
   * @returns StatsResult|never
   */
  public async fetchData(): Promise<StatsResult | never> {
    try {
      const response = await fetch(this.endpointUrl);

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

      const raw = await response.json();

      // transform json object to StatsResultDto instance
      const statsResult = plainToInstance<StatsResult, any>(StatsResult, raw);

      // stats result validation
      const errors = await validate(statsResult);
      if (errors.length > 0) {
        throw new ClassValidationError('data validation failed', errors);
      }

      return statsResult;
    } catch (error) {
      if (error instanceof ClassValidationError) {
        // log validation errors details
        logger.error(error.errors, error.message);
        throw new StatsDataProviderError(error.message);
      } else if (error instanceof StatsDataProviderError) {
        throw error;
      } else {
        // unhanded error with default message
        throw new StatsDataProviderError();
      }
    }
  }
}
