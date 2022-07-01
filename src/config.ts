import { Service } from "diod";

@Service()
export class Config {
  readonly dataSetUrl = process.env.DATA_PROVIDER_URL || "";
}
