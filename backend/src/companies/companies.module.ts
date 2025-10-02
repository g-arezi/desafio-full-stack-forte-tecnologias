import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { CompaniesRepository } from './companies.repository';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, CompaniesRepository, PrismaService],
  exports: [CompaniesService, CompaniesRepository],
})
export class CompaniesModule {}