import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Hatice Yılmaz', description: 'Kullanıcının ad soyadı' })
  @IsNotEmpty({ message: 'Ad soyad alanı boş bırakılamaz.' })
  fullName!: string;

  @ApiProperty({ example: 'hatice@patidost.com', description: 'E-posta adresi' })
  @IsEmail({}, { message: 'Geçerli bir e-posta adresi giriniz.' })
  email!: string;

  @ApiProperty({ example: '123456', description: 'En az 6 karakterli şifre' })
  @MinLength(6, { message: 'Şifre en az 6 karakter olmalıdır.' })
  password!: string;

  @ApiProperty({ example: 'USER', enum: ['USER', 'ADMIN'], required: false })
  @IsOptional()
  @IsIn(['USER', 'ADMIN'], { message: 'Rol sadece USER veya ADMIN olabilir.' })
  role?: string;
}