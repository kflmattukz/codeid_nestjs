import { IsString, IsNumber } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  departmentName: string;

  @IsNumber()
  locationId: number;

  @IsNumber()
  managerId: number;
}
