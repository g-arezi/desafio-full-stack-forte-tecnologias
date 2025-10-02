import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEmployeeAssetDto } from './dto/create-employee-asset.dto';

@Injectable()
export class EmployeeAssetsRepository {
  constructor(private prisma: PrismaService) {}

  async create(createEmployeeAssetDto: CreateEmployeeAssetDto): Promise<any> {
    return this.prisma.employeeAsset.create({
      data: createEmployeeAssetDto,
      include: {
        employee: true,
        asset: true,
      },
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.employeeAsset.findMany({
      include: {
        employee: true,
        asset: true,
      },
    });
  }

  async findByEmployee(employeeId: number): Promise<any[]> {
    return this.prisma.employeeAsset.findMany({
      where: { employeeId },
      include: {
        employee: true,
        asset: true,
      },
    });
  }

  async findByAsset(assetId: number): Promise<any[]> {
    return this.prisma.employeeAsset.findMany({
      where: { assetId },
      include: {
        employee: true,
        asset: true,
      },
    });
  }

  async findOne(id: number): Promise<any | null> {
    return this.prisma.employeeAsset.findUnique({
      where: { id },
      include: {
        employee: true,
        asset: true,
      },
    });
  }

  async remove(id: number): Promise<any> {
    return this.prisma.employeeAsset.delete({
      where: { id },
    });
  }

  async findByEmployeeAndAsset(employeeId: number, assetId: number): Promise<any | null> {
    return this.prisma.employeeAsset.findFirst({
      where: {
        employeeId,
        assetId,
      },
      include: {
        employee: true,
        asset: true,
      },
    });
  }
}