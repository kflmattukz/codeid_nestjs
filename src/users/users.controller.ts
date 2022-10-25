import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.find();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() fields: UpdateUserDto) {
    return this.usersService.update(id, fields);
  }

  @Delete()
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
