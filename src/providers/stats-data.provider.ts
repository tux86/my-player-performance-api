import { plainToInstance, serialize } from 'class-transformer';
import { StatsDataProviderError } from '../exceptions/stats-data-provider.error';
import { StatsResultDto } from '../dtos/stats-result.dto';
import { Service } from 'diod';
import { Config } from '../config';
import { validate, validateOrReject } from 'class-validator';
import validator from 'validator';
import { logger } from '../libs/logger';
import { ClassValidationError } from '../exceptions/class-validation-error';

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

      const raw = await response.json();

      // transform json object to StatsResultDto instance
      const statsResult = plainToInstance<StatsResultDto, any>(
        StatsResultDto,
        raw,
      );

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
