import {
  IsString,
  MinLength,
  IsEmail,
  IsOptional,
  IsNumber,
  Min,
  Max,
} from 'class-validator'

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Password phải là một chuỗi' })
  @MinLength(6, { message: 'Password phải có ít nhất 6 ký tự' })
  password?: string

  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email?: string

  @IsOptional()
  @IsString({ message: 'Nickname phải là một chuỗi' })
  nickname?: string

  @IsOptional()
  @IsString({ message: 'Tên đầy đủ phải là một chuỗi' })
  fullName?: string

  @IsOptional()
  @IsNumber({}, { message: 'Tuổi phải là một số' })
  @Min(1, { message: 'Tuổi phải lớn hơn 0' })
  @Max(120, { message: 'Tuổi không hợp lệ' })
  age?: number
}
