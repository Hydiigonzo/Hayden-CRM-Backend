import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards,Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

@Get()
findAll(
  @Query('page') page: string = '1',
  @Query('limit') limit: string = '10',
  @Query('sortField') sortField: string = 'id',
  @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc'
) {
  return this.companyService.findAll(
    parseInt(page, 10) || 1,
    parseInt(limit, 10) || 10,
    sortField,
    sortOrder
  );
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
