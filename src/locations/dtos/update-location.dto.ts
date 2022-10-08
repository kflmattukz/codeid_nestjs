import { IsString, IsOptional } from 'class-validator';

export class UpdateLocationDto {
  @IsString()
  @IsOptional()
  streetAddress: string;

  @IsString()
  @IsOptional()
  postalCode: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  stateProvince: string;

  @IsString()
  @IsOptional()
  countryId: string;
}
