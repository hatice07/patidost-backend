import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAdoptionDto, UpdateAdoptionStatusDto } from './adoption.dto';
import { AdoptionsService } from './adoptions.service';

@ApiTags('Adoptions (Sahiplenme Başvuruları)')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('adoptions')
export class AdoptionsController {
  constructor(private readonly adoptionsService: AdoptionsService) {}

  @Get()
  @ApiOperation({ summary: 'Tüm sahiplenme başvurularını listeler' })
  findAll() {
    return this.adoptionsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Bir hayvan ilanı için sahiplenme başvurusu yapar' })
  create(@Body() dto: CreateAdoptionDto, @Request() req: any) {
    return this.adoptionsService.create(dto, req.user.userId);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Başvuruyu onaylar veya reddeder (Onaylanırsa hayvan ADOPTED olur)' })
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAdoptionStatusDto, @Request() req: any) {
    return this.adoptionsService.updateStatus(id, dto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Sahiplenme başvurusunu siler' })
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.adoptionsService.remove(id, req.user);
  }
}