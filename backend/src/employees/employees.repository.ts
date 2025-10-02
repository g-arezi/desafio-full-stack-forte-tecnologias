import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesRepository {
  constructor(private prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<any> {
    return this.prisma.employee.create({
      data: createEmployeeDto,
      include: {
        company: true,
        assets: {
          include: {
            asset: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.employee.findMany({
      include: {
        company: true,
        assets: {
          include: {
            asset: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<any | null> {
    return this.prisma.employee.findUnique({
      where: { id },
      include: {
        company: true,
        assets: {
          include: {
            asset: true,
          },
        },
      },
    });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<any> {
    return this.prisma.employee.update({
      where: { id },
      data: updateEmployeeDto,
      include: {
        company: true,
        assets: {
          include: {
            asset: true,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<any> {
    return this.prisma.employee.delete({
      where: { id },
    });
  }

  async findByCpf(cpf: string): Promise<any | null> {
    return this.prisma.employee.findUnique({
      where: { cpf },
    });
  }

  async findByEmail(email: string): Promise<any | null> {
    return this.prisma.employee.findUnique({
      where: { email },
    });
  }

  async findByCompany(companyId: number): Promise<any[]> {
    return this.prisma.employee.findMany({
      where: { companyId },
      include: {
        company: true,
        assets: {
          include: {
            asset: true,
          },
        },
      },
    });
  }
}
