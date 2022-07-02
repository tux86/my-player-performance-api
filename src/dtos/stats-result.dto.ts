import { Player } from './player.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class StatsResult {
  @ValidateNested({ each: true })
  @Type(() => Player)
  players: Player[] = [];
}
