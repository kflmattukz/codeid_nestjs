import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
import { EmployeesService } from './employees.service';

@Controller('api/employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Get()
  async getAll() {
    return this.employeesService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.employeesService.getById(id);
  }

  @Post()
  async create(@Body() fields: CreateEmployeeDto) {
    return this.employeesService.create(fields);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() fields: UpdateEmployeeDto) {
    return this.employeesService.update(id, fields);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.employeesService.delete(id);
  }
}
