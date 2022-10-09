import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from 'output/entities/Employees';
import { JobHistory } from 'src/entities/JobHistory';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employees) private employeesRepo: Repository<Employees>,
    @InjectRepository(JobHistory) private jhRepo: Repository<JobHistory>,
  ) {}

  async getAll(): Promise<Employees[]> {
    return await this.employeesRepo.find({
      select: {
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        hireDate: true,
        salary: true,
        commissionPct: true,
        xempId: true,
      },
    });
  }

  async getById(id: number): Promise<Employees> {
    return await this.employeesRepo.findOneByOrFail({ employeeId: id });
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

  async create(attrs: Partial<Employees>): Promise<Employees> {
    const employee = await this.employeesRepo.create({ ...attrs });
    return this.employeesRepo.save(employee);
  }

  async update(id: number, attrs: Partial<Employees>): Promise<Employees> {
    const employee = await this.checkId(id);
    Object.assign(employee, attrs);
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
