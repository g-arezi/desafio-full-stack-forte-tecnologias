import { Injectable, NotFoundException } from '@nestjs/common';
import { AssetsRepository } from './assets.repository';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Asset } from '@prisma/client';

@Injectable()
export class AssetsService {
  constructor(private assetsRepository: AssetsRepository) {}

  async create(createAssetDto: CreateAssetDto): Promise<Asset> {
    return this.assetsRepository.create(createAssetDto);
  }

  async findAll(): Promise<Asset[]> {
    return this.assetsRepository.findAll();
  }

  async findOne(id: number): Promise<Asset> {
    const asset = await this.assetsRepository.findOne(id);
    if (!asset) {
      throw new NotFoundException(`Asset with ID ${id} not found`);
    }
    return asset;
  }

  async update(id: number, updateAssetDto: UpdateAssetDto): Promise<Asset> {
    // Check if asset exists
    await this.findOne(id);
    return this.assetsRepository.update(id, updateAssetDto);
  }

  async remove(id: number): Promise<Asset> {
    // Check if asset exists
    await this.findOne(id);
    return this.assetsRepository.remove(id);
  }

  async findAvailable(): Promise<Asset[]> {
    return this.assetsRepository.findAvailable();
  }
}