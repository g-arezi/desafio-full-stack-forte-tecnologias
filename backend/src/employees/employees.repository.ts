import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from '@prisma/client';

@Injectable()
export class EmployeesRepository {
  constructor(private prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
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

  async findAll(): Promise<Employee[]> {
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

  async findOne(id: number): Promise<Employee | null> {
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

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
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

  async remove(id: number): Promise<Employee> {
    return this.prisma.employee.delete({
      where: { id },
    });
  }

  async findByCpf(cpf: string): Promise<Employee | null> {
    return this.prisma.employee.findUnique({
      where: { cpf },
    });
  }

  async findByEmail(email: string): Promise<Employee | null> {
    return this.prisma.employee.findUnique({
      where: { email },
    });
  }

  async findByCompany(companyId: number): Promise<Employee[]> {
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