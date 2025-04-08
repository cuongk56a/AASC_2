import { Controller, Post, Body, Get, Render, HttpCode } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @Render('login')
  loginPage() {
    return {};
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    const data = await this.authService.login(dto);
    return { 
      message: 'Login successful',
      token: data.token,
      user: data.user,
      redirectTo: '/'
    };
  }

  @Get('register')
  @Render('register')
  registerPage() {
    return {};
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    await this.authService.register(dto)
    return { 
      message: 'Register successful',
      redirectTo: 'auth/login'
    };
  }
}
