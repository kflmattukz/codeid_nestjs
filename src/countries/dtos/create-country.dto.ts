import { IsNumber, IsString } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  countryId: string;

  @IsString()
  countryName: string;

  @IsNumber()
  regionId: number;
}
