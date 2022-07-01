import validator from 'validator';
import { HttpDataProvider } from './http-data-provider.interface';

/**
 * BaseHttpDataProvider
 */
export abstract class BaseHttpDataProvider implements HttpDataProvider {
  readonly dataSourceUrl: string;

  protected constructor(url: string) {
    this.validateUrl(url);
    this.dataSourceUrl = url;
  }

  /**
   * Must be implemented by child class
   */
  public abstract fetchData(): Promise<any>;

  protected validateUrl(url: string) {
    if (!validator.isURL(url)) {
      throw new Error('data source URL is not valid');
    }
  }
}
