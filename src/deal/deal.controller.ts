import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards,Query } from '@nestjs/common';
import { DealService } from './deal.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('deal')
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @Post()
  create(@Body() dto: CreateDealDto) {
    return this.dealService.create(dto);
  }

  @Get()
findAll(
  @Query('page') page: string = '1',
  @Query('limit') limit: string = '10',
  @Query('sortField') sortField: string = 'id',
  @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc'
) {
  return this.dealService.findAll(
    parseInt(page, 10) || 1,
    parseInt(limit, 10) || 10,
    sortField,
    sortOrder
  );
}


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dealService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDealDto) {
    return this.dealService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dealService.remove(+id);
  }
}
