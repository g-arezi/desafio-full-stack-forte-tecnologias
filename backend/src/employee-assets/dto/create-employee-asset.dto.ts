import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeAssetDto {
  @ApiProperty({
    description: 'Employee ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  employeeId: number;

  @ApiProperty({
    description: 'Asset ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  assetId: number;
}
