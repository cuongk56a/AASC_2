import { Body, Controller, Get, HttpCode, Post, Query, Render, UseGuards, UsePipes, ValidationPipe  } from '@nestjs/common'
import { CaroService } from './game-caro.service'
import { CreateRoomDto, JoinRoomDto } from './dto/game-caro.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('caro')
export class CaroController {
  constructor(private readonly caroservice: CaroService) {}

  @Get()
  @Render('caro')
  caroPage() {
    return {}
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }))
  async createRoom(@Body() data: CreateRoomDto) {
    const room = await this.caroservice.createCaro(data.socketId, data.username)
    return {
      message: 'Room created successfully',
      room: room
    }
  }

  @Get('/room')
  @Render('room')
  async roomPage(@Query('CODE')  CODE: string) {
    const room = await this.caroservice.getRoomByCode(CODE)
    return {
      message: 'Room found successfully',
      room: room,
    }
  }

  @Post('/join')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }))
  async joinRoom(@Body() data: JoinRoomDto) {
    const room = await this.caroservice.joinCaro(data.socketId, data.CODE, data.username)
    return {
      status: !!room,
      message: room ? 'Room joined successfully' : 'Room not found or already joined',
      room,
    }
  }
}
