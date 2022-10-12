import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  signup(@Body() fields: CreateUserDto) {
    return this.usersService.create(
      fields.userName,
      fields.userEmail,
      fields.userPassword,
    );
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() attrs: UpdateUserDto) {
    const user = await this.usersService.update(id, attrs);
    console.log(user);
    return {
      msg: 'Update success',
      user,
    };
  }
}
