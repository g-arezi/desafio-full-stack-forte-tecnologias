import { Module } from '@nestjs/common';
import { EmployeeAssetsService } from './employee-assets.service';
import { EmployeeAssetsController } from './employee-assets.controller';
import { EmployeeAssetsRepository } from './employee-assets.repository';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [EmployeeAssetsController],
  providers: [EmployeeAssetsService, EmployeeAssetsRepository, PrismaService],
  exports: [EmployeeAssetsService, EmployeeAssetsRepository],
})
export class EmployeeAssetsModule {}
