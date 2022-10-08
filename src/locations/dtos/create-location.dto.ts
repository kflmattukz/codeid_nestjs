import { IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  streetAddress: string;

  @IsString()
  postalCode: string;

  @IsString()
  city: string;

  @IsString()
  stateProvince: string;

  @IsString()
  countryId: string;
}
