import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgreConfig } from './config/database.config';
import { RegionsModule } from './regions/regions.module';
import { CountriesModule } from './countries/countries.module';
import { LocationsModule } from './locations/locations.module';
import { EmployeesModule } from './employees/employees.module';
import { DepartmentsModule } from './departments/departments.module';
import { JobsModule } from './jobs/jobs.module';
import { JhModule } from './jh/jh.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(postgreConfig),
    RegionsModule,
    CountriesModule,
    LocationsModule,
    EmployeesModule,
    DepartmentsModule,
    JobsModule,
    JhModule,
  ],
})
export class AppModule {}
