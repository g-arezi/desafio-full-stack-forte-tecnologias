import { Injectable, NotFoundException } from '@nestjs/common';
import { AssetsRepository } from './assets.repository';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Injectable()
export class AssetsService {
  constructor(private assetsRepository: AssetsRepository) {}

  async create(createAssetDto: CreateAssetDto): Promise<any> {
    return this.assetsRepository.create(createAssetDto);
  }

  async findAll(): Promise<any[]> {
    return this.assetsRepository.findAll();
  }

  async findOne(id: number): Promise<any> {
    const asset = await this.assetsRepository.findOne(id);
    if (!asset) {
      throw new NotFoundException(`Asset with ID ${id} not found`);
    }
    return asset;
  }

  async update(id: number, updateAssetDto: UpdateAssetDto): Promise<any> {
    // Check if asset exists
    await this.findOne(id);
    return this.assetsRepository.update(id, updateAssetDto);
  }

  async remove(id: number): Promise<any> {
    // Check if asset exists
    await this.findOne(id);
    return this.assetsRepository.remove(id);
  }

  async findAvailable(): Promise<any[]> {
    return this.assetsRepository.findAvailable();
  }
}
