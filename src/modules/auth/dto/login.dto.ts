import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class LoginDto {
  @IsNotEmpty({ message: 'Username là bắt buộc' })
  @IsString({ message: 'Username phải là một chuỗi' })
  username: string

  @IsNotEmpty({ message: 'Password là bắt buộc' })
  @IsString({ message: 'Password phải là một chuỗi' })
  @MinLength(6, { message: 'Password phải có ít nhất 6 ký tự' })
  password: string
}
