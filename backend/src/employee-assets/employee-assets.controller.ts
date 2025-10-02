import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { EmployeeAssetsService } from './employee-assets.service';
import { CreateEmployeeAssetDto } from './dto/create-employee-asset.dto';

@ApiTags('employee-assets')
@Controller('employee-assets')
export class EmployeeAssetsController {
  constructor(private readonly employeeAssetsService: EmployeeAssetsService) {}

  @Post()
  @ApiOperation({ summary: 'Assign an asset to an employee' })
  @ApiResponse({ status: 201, description: 'Asset assigned successfully' })
  @ApiResponse({ status: 409, description: 'Asset already assigned to this employee' })
  create(@Body() createEmployeeAssetDto: CreateEmployeeAssetDto) {
    return this.employeeAssetsService.create(createEmployeeAssetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all employee-asset associations' })
  @ApiResponse({ status: 200, description: 'List of all associations' })
  findAll() {
    return this.employeeAssetsService.findAll();
  }

  @Get('employee/:employeeId')
  @ApiOperation({ summary: 'Get all assets assigned to an employee' })
  @ApiParam({ name: 'employeeId', description: 'Employee ID' })
  @ApiResponse({ status: 200, description: 'List of assets assigned to the employee' })
  findByEmployee(@Param('employeeId', ParseIntPipe) employeeId: number) {
    return this.employeeAssetsService.findByEmployee(employeeId);
  }

  @Get('asset/:assetId')
  @ApiOperation({ summary: 'Get all employees assigned to an asset' })
  @ApiParam({ name: 'assetId', description: 'Asset ID' })
  @ApiResponse({ status: 200, description: 'List of employees assigned to the asset' })
  findByAsset(@Param('assetId', ParseIntPipe) assetId: number) {
    return this.employeeAssetsService.findByAsset(assetId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Unassign an asset from an employee' })
  @ApiParam({ name: 'id', description: 'Employee-Asset association ID' })
  @ApiResponse({ status: 200, description: 'Asset unassigned successfully' })
  @ApiResponse({ status: 404, description: 'Association not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employeeAssetsService.remove(id);
  }
}