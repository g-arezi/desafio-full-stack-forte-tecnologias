import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesRepository {
  constructor(private prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<any> {
    return this.prisma.company.create({
      data: createCompanyDto,
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.company.findMany({
      include: {
        employees: true,
      },
    });
  }

  async findOne(id: number): Promise<any | null> {
    return this.prisma.company.findUnique({
      where: { id },
      include: {
        employees: true,
      },
    });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<any> {
    return this.prisma.company.update({
      where: { id },
      data: updateCompanyDto,
    });
  }

  async remove(id: number): Promise<any> {
    return this.prisma.company.delete({
      where: { id },
    });
  }

  async findByCnpj(cnpj: string): Promise<any | null> {
    return this.prisma.company.findUnique({
      where: { cnpj },
    });
  }
}
