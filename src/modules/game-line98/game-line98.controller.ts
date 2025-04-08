import { Controller, Get, Render } from '@nestjs/common'
import { GameLine98Service } from './game-line98.service'

@Controller('line98')
export class GameLine98Controller {
  constructor(private readonly gameLine98Service: GameLine98Service) {}

  @Get()
  @Render('line98')
  line98Page() {
    return {}
  }
}
