import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CaroService } from './game-caro.service';
import { Caro } from './schemas/game-caro.schema';

@WebSocketGateway({ cors: true })
export class CaroGateway{
  @WebSocketServer()
  server: Server;

  constructor(private readonly caroService: CaroService) {}

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() data: { roomCode: string; socketId: string, username: string, type: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const { roomCode, socketId, username, type } = data;
    // socket.join(roomCode);
    const room: Caro = await this.caroService.getRoomByCode(roomCode);
    if (!room) {
      socket.emit('roomNotFound', { message: 'Phòng không tồn tại' });
      return;
    }
    if(type === 'guest'){
      console.log('Guest đã vào phòng:', roomCode, socketId, username, type);
      this.server.emit('guestJoined', { message: `Có người đã tham gia phòng`, roomCode: roomCode, room });
      setTimeout(() => {
        this.server.emit('startGameTimer', { message: 'Game sẽ bắt đầu sau 30 giây...', roomCode: roomCode });
      }, 2000);
      await this.caroService.updateCaro(roomCode);
    }
  }

  @SubscribeMessage('makeMove')
  async handlePlayerMove(
    @MessageBody() data: { roomCode: string; row: number; col: number, symbol: string, nextPlayer: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const { roomCode, row, col, symbol, nextPlayer } = data;
    
    const room: Caro = await this.caroService.getRoomByCode(roomCode);
    if (!room) return;

    this.server.emit('makeMove', { roomCode, row, col, symbol, nextPlayer });
  }

  @SubscribeMessage('gameWon')
  async handlePlayerWon(
    @MessageBody() data: { roomCode: string; winner: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const { roomCode, winner } = data;
    
    const room: Caro = await this.caroService.getRoomByCode(roomCode);
    if (!room) return;

    this.server.emit('gameWon', { roomCode, winner});
  }

  @SubscribeMessage('gameDraw')
  async handlePlayerDraw(
    @MessageBody() data: { roomCode: string;},
    @ConnectedSocket() socket: Socket,
  ) {
    const { roomCode } = data;
    
    const room: Caro = await this.caroService.getRoomByCode(roomCode);
    if (!room) return;

    this.server.emit('gameDraw', { roomCode});
  }
}