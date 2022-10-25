import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private usersRepo: Repository<Users>) {}

  async find(): Promise<Users[]> {
    return await this.usersRepo.find({
      select: { userName: true, userEmail: true },
    });
  }

  async findOne(id: number): Promise<Users> {
    return await this.findUser(id);
  }

  async update(userId: number, attrs: Partial<Users>): Promise<Users> {
    const user = await this.findUser(userId);
    Object.assign(user, attrs);
    return await this.usersRepo.save(user);
  }

  async remove(id: number): Promise<Users> {
    const user = await this.findUser(id);
    return await this.usersRepo.remove(user);
  }

  async findUser(id: number): Promise<Users> {
    const user = await this.usersRepo.findOneBy({ userId: id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
