import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from 'output/entities/Employees';
import { JobHistory } from 'src/entities/JobHistory';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employees) private employeesRepo: Repository<Employees>,
    @InjectRepository(JobHistory) private jhRepo: Repository<JobHistory>,
  ) {}

  async getAll(): Promise<Employees[]> {
    return await this.employeesRepo.find({
      relations: ['job', 'manager', 'department'],
      select: {
        employeeId: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        hireDate: true,
        salary: true,
        commissionPct: true,
        xempId: true,
        job: {
          jobId: true,
          jobTitle: true
        },
        department: {
          departmentId: true,
          departmentName: true
        },
        manager: {
          employeeId: true,
          firstName: true,
          lastName: true
        }
      },
    });
  }

  async getById(id: number): Promise<Employees> {
    return await this.employeesRepo.findOne({ 
      where:  { employeeId: id },
      relations: ['job', 'manager', 'department'],
      select: {
        employeeId: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        hireDate: true,
        salary: true,
        commissionPct: true,
        xempId: true,
        job: {
          jobId: true,
          jobTitle: true
        },
        department: {
          departmentId: true,
          departmentName: true
        },
        manager: {
          employeeId: true,
          firstName: true,
          lastName: true
        }
      },
    });
  }

  async history(id: number): Promise<JobHistory[]> {
    return await this.jhRepo.find({
      relations: {
        job: true,
        department: true,
      },
      where: { employeeId: id },
    });
  }

  async create(attrs: Partial<CreateEmployeeDto>): Promise<Employees> {
    const employee = await this.employeesRepo.create({
      firstName: attrs.firstName,
      lastName: attrs.lastName,
      email: attrs.email,
      phoneNumber: attrs.phoneNumber,
      hireDate: attrs.hireDate,
      salary: attrs.salary,
      commissionPct: attrs.commissionPct,
      xempId: attrs.xempId,
      job: { jobId: attrs.jobId },
      manager: { employeeId: attrs.managerId },
      department: { departmentId: attrs.departmentId }
    });
    return this.employeesRepo.save(employee);
  }

  async update(id: number, attrs: Partial<UpdateEmployeeDto>): Promise<Employees> {
    const employee = await this.checkId(id);
    Object.assign(employee, attrs);
    employee.job.jobId = attrs.jobId;
    employee.manager.employeeId = attrs.managerId;
    employee.department.departmentId = attrs.departmentId;
    return this.employeesRepo.save(employee);
  }

  async delete(id: number): Promise<Employees> {
    const employee = await this.checkId(id);
    return this.employeesRepo.remove(employee);
  }

  private async checkId(id: number): Promise<Employees> {
    try {
      return await this.getById(id);
    } catch (err) {
      throw new Error(err);
    }
  }
}
