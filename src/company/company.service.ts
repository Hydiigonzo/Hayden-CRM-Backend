import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  create(createCompanyDto: CreateCompanyDto) {
    return this.prisma.company.create({ data: createCompanyDto });
  }

  async findAll(
  page: number = 1,
  limit: number = 10,
  sortField: string = 'id',
  sortOrder: 'asc' | 'desc' = 'asc'
) {
  return this.prisma.company.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { [sortField]: sortOrder },
    include: {
      contacts: { include: { contact: true } },
      deals: true,
    }
  });
}


  findOne(id: number) {
    return this.prisma.company.findUnique({ where: { id } });
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return this.prisma.company.update({ where: { id }, data: updateCompanyDto });
  }

  remove(id: number) {
    return this.prisma.company.delete({ where: { id } });
  }
}
