import { Gender } from '../enums/gender.enum';
import { Country } from './country.entity';

export class Player {
  id: number;
  firstname: string;
  lastname: string;
  shortname: string;
  sex: Gender;
  country: Country;
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
