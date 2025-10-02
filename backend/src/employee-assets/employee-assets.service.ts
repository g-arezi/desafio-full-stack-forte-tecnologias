import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { EmployeeAssetsRepository } from './employee-assets.repository';
import { CreateEmployeeAssetDto } from './dto/create-employee-asset.dto';

@Injectable()
export class EmployeeAssetsService {
  constructor(private employeeAssetsRepository: EmployeeAssetsRepository) {}

  async create(createEmployeeAssetDto: CreateEmployeeAssetDto): Promise<any> {
    // Check if association already exists
    const existingAssociation = await this.employeeAssetsRepository.findByEmployeeAndAsset(
      createEmployeeAssetDto.employeeId,
      createEmployeeAssetDto.assetId,
    );
    
    if (existingAssociation) {
      throw new ConflictException('Asset already assigned to this employee');
    }

    return this.employeeAssetsRepository.create(createEmployeeAssetDto);
  }

  async findAll(): Promise<any[]> {
    return this.employeeAssetsRepository.findAll();
  }

  async findByEmployee(employeeId: number): Promise<any[]> {
    return this.employeeAssetsRepository.findByEmployee(employeeId);
  }

  async findByAsset(assetId: number): Promise<any[]> {
    return this.employeeAssetsRepository.findByAsset(assetId);
  }

  async findOne(id: number): Promise<any> {
    const employeeAsset = await this.employeeAssetsRepository.findOne(id);
    if (!employeeAsset) {
      throw new NotFoundException(`Employee-Asset association with ID ${id} not found`);
    }
    return employeeAsset;
  }

  async remove(id: number): Promise<any> {
    // Check if association exists
    await this.findOne(id);
    return this.employeeAssetsRepository.remove(id);
  }
}
