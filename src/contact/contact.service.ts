import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

async create(createContactDto: CreateContactDto) {
  return this.prisma.contact.create({
    data: {
      name: createContactDto.name,
      email: createContactDto.email,
      phone: createContactDto.phone,
      address: createContactDto.address,
      companies: createContactDto.companyIds
        ? {
            create: createContactDto.companyIds.map(companyId => ({
              company: { connect: { id: companyId } }
            })),
          }
        : undefined,
    },
    include: { companies: { include: { company: true } } }
  });
}


  async findAll(
  page: number = 1,
  limit: number = 10,
  sortField: string = 'id',
  sortOrder: 'asc' | 'desc' = 'asc'
) {
  return this.prisma.contact.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { [sortField]: sortOrder },
    include: {
      companies: { include: { company: true } },
      deals: { include: { deal: true } },
    }
  });
}


  async findOne(id: number) {
    return this.prisma.contact.findUnique({ where: { id } });
  }

  async update(id: number, updateContactDto: Partial<CreateContactDto>) {
    return this.prisma.contact.update({
      where: { id },
      data: updateContactDto,
    });
  }

  async remove(id: number) {
    return this.prisma.contact.delete({ where: { id } });
  }
}
