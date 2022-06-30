import { Gender } from "../enums/gender.enum";
import { CountryEntity } from "./country.entity";

export class Player {
  id: number;
  firstname: string;
  lastname: string;
  shortname: string;
  sex: Gender;
  country: CountryEntity;
  picture: string;
  data: {
    rank: number;
    points: number;
    weight: number;
    height: number;
    age: number;
    last: [number];
  };
}
