import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private usersRepo: Repository<Users>) {}

  async create(
    userName: string,
    userEmail: string,
    userPassword: string,
  ): Promise<Users> {
    // Create untuk buat Entity
    const user = await this.usersRepo.create({
      userName,
      userEmail,
      userPassword,
    });
    //
    return await this.usersRepo.save(user);
  }

  async update(userId: number, attrs: Partial<Users>): Promise<Users> {
    // Ambil Entity user yg mau kita update
    const user = await this.usersRepo.findOneBy({ userId });
    // chech apakah entity ada ?
    if (!user) {
      // jika tidak ada lempar error
      throw new Error('User not found');
    }
    // jika ada update data baru
    Object.assign(user, attrs);
    // save data baru
    return await this.usersRepo.save(user);
  }
}
