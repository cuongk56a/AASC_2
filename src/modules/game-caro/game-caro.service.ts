import { Injectable } from '@nestjs/common';
import { Caro, CaroDocument, CaroStatus } from './schemas/game-caro.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CaroService {
  constructor(@InjectModel(Caro.name) private caroModel: Model<CaroDocument>) {}

  generateCode(length = 6) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }

  async generateUniqueCode() {
    let code: string;
    do {
      code = this.generateCode();
    } while (await this.caroModel.exists({ CODE: code }));
    return code;
  }


  async createCaro(socketId: string, username: string) {
    const CODE = await this.generateUniqueCode();
    const room: Caro = {
      CODE: CODE,
      host: username ,
      status: CaroStatus.WAITING,
    };
    // this.caroModel.push(room);
    return await this.caroModel.create(room)
  }

  async getRoomByCode(code: string) {
    const room = await this.caroModel.findOne({ CODE: code })
      .populate('hostUser', 'fullName nickname')
      .populate('guestUser', 'fullName nickname')
      .exec();
    if (!room) throw new Error('Room not found');
    return room;
  }

  async joinCaro(socketId: string, CODE: string, username: string) {
    const room = await this.caroModel.findOne({ CODE: CODE, status: CaroStatus.WAITING });
    if (!room || room.guest){
      return null;
    }else{
      const roomUpdate = await this.caroModel.findOneAndUpdate(
        { CODE: CODE },
        { guest: username},
        { new: true }
      )
      return roomUpdate;
    }
  }

  async updateCaro(roomCode: string) {
    await this.caroModel.findOneAndUpdate(
      { CODE: roomCode },
      { status: CaroStatus.PLAYING },
      { new: true }
    )
  }
}