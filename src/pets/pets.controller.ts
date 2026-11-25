import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePetDto, UpdatePetDto } from './pet.dto';
import { PetsService } from './pets.service';

@ApiTags('Pets (Hayvan İlanları)')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  @ApiOperation({ summary: 'Tüm hayvan ilanlarını listeler' })
  findAll() {
    return this.petsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bilgisine göre tek bir hayvan ilanını getirir' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.petsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Yeni sahiplendirme ilanı oluşturur' })
  create(@Body() dto: CreatePetDto, @Request() req: any) {
    return this.petsService.create(dto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Mevcut hayvan ilanını günceller' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePetDto, @Request() req: any) {
    return this.petsService.update(id, dto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Hayvan ilanını siler' })
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.petsService.remove(id, req.user);
  }
}