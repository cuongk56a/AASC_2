import { Module } from '@nestjs/common';
// import { CaroGateway } from './game-caro.gateway';
import { CaroService } from './game-caro.service';
import { CaroController } from './game-caro.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Caro, CaroSchema } from './schemas/game-caro.schema';
import { CaroGateway } from './game-caro.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: Caro.name, schema: CaroSchema }])],
    controllers: [CaroController],
    exports: [CaroService],
    providers: [CaroGateway,CaroService],
})
export class GameCaroModule {}
