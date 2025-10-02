import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Injectable()
export class AssetsRepository {
  constructor(private prisma: PrismaService) {}

  async create(createAssetDto: CreateAssetDto): Promise<any> {
    return this.prisma.asset.create({
      data: {
        ...createAssetDto,
        status: 'DISPONIVEL',
      },
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.asset.findMany({
      include: {
        employees: {
          include: {
            employee: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<any | null> {
    return this.prisma.asset.findUnique({
      where: { id },
      include: {
        employees: {
          include: {
            employee: true,
          },
        },
      },
    });
  }

  async update(id: number, updateAssetDto: UpdateAssetDto): Promise<any> {
    return this.prisma.asset.update({
      where: { id },
      data: updateAssetDto,
    });
  }

  async remove(id: number): Promise<any> {
    return this.prisma.asset.delete({
      where: { id },
    });
  }

  async findAvailable(): Promise<any[]> {
    return this.prisma.asset.findMany({
      where: { status: 'DISPONIVEL' },
    });
  }

  async findByEmployee(employeeId: number): Promise<any[]> {
    return this.prisma.asset.findMany({
      where: {
        employees: {
          some: {
            employeeId,
          },
        },
      },
    });
  }

  async updateStatus(id: number, status: string): Promise<any> {
    return this.prisma.asset.update({
      where: { id },
      data: { status },
    });
  }
}
