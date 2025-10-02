import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards,Query } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body() dto: CreateContactDto) {
    return this.contactService.create(dto);
  }

  @Get()
findAll(
  @Query('page') page: string = '1',
  @Query('limit') limit: string = '10',
  @Query('sortField') sortField: string = 'id',
  @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc'
) {
  return this.contactService.findAll(
    parseInt(page, 10) || 1,
    parseInt(limit, 10) || 10,
    sortField,
    sortOrder
  );
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateContactDto) {
    return this.contactService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
