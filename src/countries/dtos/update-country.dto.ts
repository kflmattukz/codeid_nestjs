import { IsOptional, IsString } from 'class-validator';

export class UpdateCountryDto {
  @IsString()
  @IsOptional()
  countryId: string;

  @IsString()
  @IsOptional()
  countryName: string;

  @IsOptional()
  regionId: number;
}
