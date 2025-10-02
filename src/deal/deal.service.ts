import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';

@Injectable()
export class DealService {
  constructor(private prisma: PrismaService) {}

async create(createDealDto: CreateDealDto) {
  return this.prisma.deal.create({
    data: {
      title: createDealDto.title,
      stage: createDealDto.stage,
      amount: createDealDto.amount,
      company: { connect: { id: createDealDto.companyId } },
      contacts: createDealDto.contactIds
        ? {
            create: createDealDto.contactIds.map(contactId => ({
              contact: { connect: { id: contactId } }
            })),
          }
        : undefined,
    },
    include: {
      company: true,
      contacts: { include: { contact: true } },
    }
  });
}

  // In src/deal/deal.service.ts

async findAll(
  page: number = 1,
  limit: number = 10,
  sortField: string = 'id',
  sortOrder: 'asc' | 'desc' = 'asc'
) {
  return this.prisma.deal.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { [sortField]: sortOrder },
    include: {
      company: true,
      contacts: { include: { contact: true } },
    }
  });
}

  findOne(id: number) {
    return this.prisma.deal.findUnique({ where: { id } });
  }

  update(id: number, updateDealDto: UpdateDealDto) {
    return this.prisma.deal.update({ where: { id }, data: updateDealDto });
  }

  remove(id: number) {
    return this.prisma.deal.delete({ where: { id } });
  }
}
