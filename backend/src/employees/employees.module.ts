import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { EmployeesRepository } from './employees.repository';
import { PrismaService } from '../prisma.service';
import { CompaniesModule } from '../companies/companies.module';

@Module({
  imports: [CompaniesModule],
  controllers: [EmployeesController],
  providers: [EmployeesService, EmployeesRepository, PrismaService],
  exports: [EmployeesService, EmployeesRepository],
})
export class EmployeesModule {}