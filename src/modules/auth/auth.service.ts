import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UsersService } from '../users/users.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByUsername(dto.username)
    if (existing) throw new ConflictException('Người dùng đã tồn tại')

    const hash = await bcrypt.hash(dto.password, 10)
    await this.usersService.create({ ...dto, password: hash })
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByUsername(dto.username)
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Thông tin đăng nhập không chính xác')
    }

    const token = this.jwtService.sign({ sub: user._id })
    return {token, user: { ...user.toObject(), password: undefined } }
  }
}
