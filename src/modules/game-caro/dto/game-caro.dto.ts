import {
  IsString,
} from 'class-validator'

export class CreateRoomDto {
  @IsString()
  socketId: string

  @IsString()
  username: string
}

export class JoinRoomDto {
  @IsString()
  socketId: string

  @IsString()
  username: string

  @IsString()
  CODE: string
}
