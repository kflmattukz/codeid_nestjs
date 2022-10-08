import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Departments } from 'src/entities/Departments';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Departments)
    private departmentsRepo: Repository<Departments>,
  ) {}

  async getAll(): Promise<Departments[]> {
    return await this.departmentsRepo.find();
  }

  async getById(id: number): Promise<Departments> {
    return await this.departmentsRepo.findOneByOrFail({ departmentId: id });
  }

  async create(
    departmentName: string,
    locationId: number,
    employeeId: number,
  ): Promise<Departments> {
    const department = this.departmentsRepo.create({
      departmentName,
      location: { locationId },
      manager: { employeeId },
    });
    return this.departmentsRepo.save(department);
  }

  async update(id: number, attrs: Partial<Departments>): Promise<Departments> {
    const department = await this.checkId(id);
    Object.assign(department, attrs);
    return this.departmentsRepo.save(department);
  }

  async delete(id: number): Promise<Departments> {
    const department = await this.checkId(id);
    return this.departmentsRepo.remove(department);
  }

  private async checkId(id: number) {
    try {
      return await this.departmentsRepo.findOneByOrFail({ departmentId: id });
    } catch (err) {
      throw new Error('Department not found, please provite the right id');
    }
  }
}
