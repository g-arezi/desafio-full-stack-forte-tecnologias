import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum AssetType {
  NOTEBOOK = 'NOTEBOOK',
  MONITOR = 'MONITOR',
  CELULAR = 'CELULAR',
  MOUSE = 'MOUSE',
  TECLADO = 'TECLADO',
  TABLET = 'TABLET',
}

export enum AssetStatus {
  DISPONIVEL = 'DISPONIVEL',
  EM_USO = 'EM_USO',
  EM_MANUTENCAO = 'EM_MANUTENCAO',
}

export class CreateAssetDto {
  @ApiProperty({
    description: 'Asset name',
    example: 'MacBook Pro 13"'
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Asset type',
    enum: AssetType,
    example: AssetType.NOTEBOOK
  })
  @IsNotEmpty()
  @IsEnum(AssetType)
  type: AssetType;

  @ApiProperty({
    description: 'Serial number of the asset',
    example: 'ABC123456789',
    required: false
  })
  @IsOptional()
  @IsString()
  serialNumber?: string;

  @ApiProperty({
    description: 'Asset description',
    example: 'MacBook Pro 13" 2021 with M1 chip',
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;
}