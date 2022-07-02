import { Gender } from '../enums/gender.enum';
import { Country } from './country.dto';
import { Stats } from './stats.dto';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  IsUrl,
  Min,
  ValidateNested,
} from 'class-validator';

export class Player {
  @IsNumber()
  @Min(1)
  id: number;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  shortname: string;

  @IsEnum(Gender)
  sex: Gender;

  @ValidateNested()
  @Type(() => Country)
  country: Country;

  @IsUrl()
  picture: string;

  @ValidateNested()
  @Type(() => Stats)
  data: Stats;
}
