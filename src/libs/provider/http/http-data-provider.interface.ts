/**
 * HttpDataProviderInterface
 */
export interface HttpDataProvider {
  readonly dataSourceUrl: string;

  fetchData();
}
