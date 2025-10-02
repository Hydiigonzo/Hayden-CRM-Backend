import { Module } from '@nestjs/common';
import { DealService } from './deal.service';
import { DealController } from './deal.controller';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DealController],
  providers: [DealService],
})
export class DealModule {}
