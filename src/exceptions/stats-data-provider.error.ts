/**
 * StatsDataProviderError
 */
export class StatsDataProviderError extends Error {
  constructor(message = 'Failed to retrieve data for this request') {
    super();
    this.message = message;
  }
}
