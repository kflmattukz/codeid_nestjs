import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() user: AuthDto) {
    return this.authService.signup(user);
  }

  @Post('signin')
  signin(@Body() user: AuthDto) {
    return this.authService.signin(user);
  }
}
