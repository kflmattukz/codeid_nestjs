import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCountryDto {
  @IsString()
  @IsOptional()
  countryId: string;

  @IsString()
  @IsOptional()
  countryName: string;

  @IsNumber()
  @IsOptional()
  regionId: number;
}
