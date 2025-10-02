import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactService } from './contact/contact.service';
import { ContactModule } from './contact/contact.module';
import { CompanyModule } from './company/company.module';
import { DealModule } from './deal/deal.module';
import { PrismaModule } from './prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ContactModule, CompanyModule, DealModule, PrismaModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, ContactService],
})
export class AppModule {}
