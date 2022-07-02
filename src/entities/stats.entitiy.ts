import { IsNumber, IsPositive } from 'class-validator';

export class Stats {
  @IsPositive()
  rank: number;

  @IsPositive()
  points: number;

  @IsPositive()
  weight: number;

  @IsPositive()
  height: number;

  @IsPositive()
  age: number;

  @IsNumber({}, { each: true })
  last: [number];
}
