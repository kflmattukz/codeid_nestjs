import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employees } from 'src/entities/Employees';
import { JobHistory } from 'src/entities/JobHistory';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employees, JobHistory])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
