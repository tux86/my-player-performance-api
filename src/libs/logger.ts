import pino from 'pino';
import pretty from 'pino-pretty';

const stream = pretty({
  sync: true,
  translateTime: true,
  colorize: true,
});

export const logger = pino(
  {
    enabled: process.env.NODE_ENV !== 'test',
    level: process.env.NODE_ENV === 'production' ? 'info' : 'trace',
    base: undefined, // remove pid and hostname
  },
  stream,
);
