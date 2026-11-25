import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateHealthRecordDto, UpdateHealthRecordDto } from './health-record.dto';
import { HealthRecordsService } from './health-records.service';

@ApiTags('Health Records (Aşı ve Sağlık Kayıtları)')
@Controller('health-records')
export class HealthRecordsController {
  constructor(private readonly healthService: HealthRecordsService) {}

  @Get()
  @ApiOperation({ summary: 'Tüm sağlık ve aşı kayıtlarını listeler' })
  findAll() {
    return this.healthService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Hayvana yeni aşı/sağlık kaydı ekler' })
  create(@Body() dto: CreateHealthRecordDto, @Request() req: any) {
    return this.healthService.create(dto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Sağlık kaydını günceller' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateHealthRecordDto, @Request() req: any) {
    return this.healthService.update(id, dto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Sağlık kaydını siler' })
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.healthService.remove(id, req.user);
  }
}