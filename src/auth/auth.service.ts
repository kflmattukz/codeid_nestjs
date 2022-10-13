import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Users) private usersRepo: Repository<Users>) {}

  async signup(user: AuthDto) {
    const { userName, userEmail } = user;
    let { userPassword } = user;
    userPassword = await this.hashedPassword(userPassword);
    const newUser = await this.usersRepo.create({
      userName,
      userEmail,
      userPassword,
    });
    return await this.usersRepo.save(newUser);
  }

  async signin(user: AuthDto) {
    const findedUser = await this.findUser(user.userName, user.userEmail);
    const isMatch = await bcrypt.compare(
      user.userPassword,
      findedUser.userPassword,
    );
    if (!isMatch)
      throw new UnauthorizedException(
        'Credentials not match, please try again',
      );

    return findedUser;
    // Make a Authentication on Users signin
  }

  async hashedPassword(userPassword: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(userPassword, salt);
    return hash;
  }

  async findUser(userName: string, userEmail: string) {
    const userByUsername = await this.usersRepo.findOneBy({ userName });
    if (userByUsername) return userByUsername;

    const userByEmail = await this.usersRepo.findOneBy({ userEmail });
    if (userByEmail) return userByEmail;

    throw new NotFoundException('User not Found');
  }
}
