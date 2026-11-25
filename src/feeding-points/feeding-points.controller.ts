import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateFeedingPointDto, UpdateFeedingPointDto } from './feeding-point.dto';
import { FeedingPointsService } from './feeding-points.service';

@ApiTags('Feeding Points (Besleme Noktaları)')
@Controller('feeding-points')
export class FeedingPointsController {
  constructor(private readonly feedingService: FeedingPointsService) {}

  @Get()
  @ApiOperation({ summary: 'Tüm mama ve su odak noktalarını listeler' })
  findAll() {
    return this.feedingService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Yeni besleme noktası ekler' })
  create(@Body() dto: CreateFeedingPointDto, @Request() req: any) {
    return this.feedingService.create(dto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Besleme noktasının mama durumunu veya bilgilerini günceller' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFeedingPointDto) {
    return this.feedingService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Besleme noktasını siler' })
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.feedingService.remove(id, req.user);
  }
}