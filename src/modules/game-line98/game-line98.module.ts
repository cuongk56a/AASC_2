import { Module } from '@nestjs/common'
import { GameLine98Service } from './game-line98.service'
import { GameLine98Controller } from './game-line98.controller'

@Module({
  controllers: [GameLine98Controller],
  providers: [GameLine98Service],
})
export class GameLine98Module {}
