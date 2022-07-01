// export default {
//   dataSourceUrl: process.env.DATA_SOURCE_URL || '',
// };

import { Service } from 'diod';

@Service()
export class Config {
  readonly dataSourceUrl = process.env.DATA_SOURCE_URL || '';
}
