import "reflect-metadata";
import { ContainerBuilder } from "diod";
import { DataSetClient } from "./clients/dataset.client";
import { PlayerService } from "./services/player.service";

console.debug("registering services in the Container ...");
const builder = new ContainerBuilder();

// services registration
console.debug("container.register ▶️", DataSetClient.name);
builder.registerAndUse(DataSetClient);
console.debug("container.register ▶️️", PlayerService.name);
builder.registerAndUse(PlayerService);

// build container
export const container = builder.build();
console.debug("container is ready");
