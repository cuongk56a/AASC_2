import { Controller, Get, Param, Body, UseGuards, Req, Patch, ValidationPipe, UsePipes, Render  } from '@nestjs/common'
import { UsersService } from './users.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { UpdateUserDto } from './dto/update-user.dto'
import { Transform } from 'class-transformer'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @Render('profile')
  profilePage() {
    return {}
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }))
  update(@Req() req: any, @Body() data: UpdateUserDto) {
    return this.usersService.update(req.user.userId, data)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.usersService.findById(id)
  }
}
