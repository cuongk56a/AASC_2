import { IsString, MaxLength } from 'class-validator'

export class RegisterDto {
  @IsString()
  fullName: string

  @IsString()
  username: string

  @IsString()
  @MaxLength(6)
  password: string
}
