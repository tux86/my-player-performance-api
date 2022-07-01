import "reflect-metadata";
import { ContainerBuilder } from "diod";
import { DataProviderClient } from "./clients/data-provider.client";
import { PlayerService } from "./services/player.service";
import { Config } from "./config";

console.debug("registering services in the Container ...");
const builder = new ContainerBuilder();

// services registration
console.debug("container.register ▶️", Config.name);
builder.registerAndUse(Config);
console.debug("container.register ▶️", DataProviderClient.name);
builder.registerAndUse(DataProviderClient);
console.debug("container.register ▶️️", PlayerService.name);
builder.registerAndUse(PlayerService);

// build container
export const container = builder.build();
console.debug("container is ready");
