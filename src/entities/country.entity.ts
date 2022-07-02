import { IsUppercase, IsUrl } from 'class-validator';

export class Country {
  @IsUppercase()
  code: string;

  @IsUrl()
  picture: string;
}
