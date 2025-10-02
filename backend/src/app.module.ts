import { Module } from '@nestjs/common';
import { CompaniesModule } from './companies/companies.module';
import { EmployeesModule } from './employees/employees.module';
import { AssetsModule } from './assets/assets.module';
import { EmployeeAssetsModule } from './employee-assets/employee-assets.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    CompaniesModule,
    EmployeesModule,
    AssetsModule,
    EmployeeAssetsModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}

