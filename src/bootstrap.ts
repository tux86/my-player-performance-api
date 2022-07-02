import 'reflect-metadata';
import { Container, ContainerBuilder } from 'diod';
import { StatsDataProvider } from './providers/stats-data.provider';
import { PlayerService } from './services/player.service';
import { Config } from './config';
import { logger } from './libs/logger';

export const initializeDIContainer = (): Container => {
  logger.debug('registering services in the Container ...');
  const builder = new ContainerBuilder();
  // services registration
  logger.debug('container.register ▶️ ' + Config.name);
  builder.registerAndUse(Config);
  logger.debug('container.register ▶ ️' + StatsDataProvider.name);
  builder.registerAndUse(StatsDataProvider);
  logger.debug('container.register ▶️️ ' + PlayerService.name);
  builder.registerAndUse(PlayerService);
  logger.debug('container is ready');
  return builder.build();
};

// **** bootstrap ****
global.fetch = require('node-fetch'); // global fetch declaration required by lambda env
export const container = initializeDIContainer();
