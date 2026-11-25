import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'hatice@patidost.com' })
  @IsEmail({}, { message: 'Geçerli bir e-posta adresi giriniz.' })
  email!: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty({ message: 'Şifre boş bırakılamaz.' })
  password!: string;
}