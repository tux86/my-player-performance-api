import { IsNumber, IsPositive } from 'class-validator';

export class Stats {
  @IsNumber()
  rank: number;

  @IsNumber()
  points: number;

  @IsNumber()
  weight: number;

  @IsNumber()
  height: number;

  @IsNumber()
  age: number;

  @IsNumber({}, { each: true })
  last: [number];
}
