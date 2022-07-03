import { Service } from 'diod';

@Service()
export class Config {
  readonly endpointUrl = process.env.ENDPOINT_URL || '';
}
