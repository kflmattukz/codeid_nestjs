import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  userName: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  userEmail: string;

  @IsString()
  @IsOptional()
  userPassword: string;
}
