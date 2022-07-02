import { Player } from '../entities/player.entity';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class StatsResultDto {
  @ValidateNested({ each: true })
  @Type(() => Player)
  players: Player[] = [];
}
