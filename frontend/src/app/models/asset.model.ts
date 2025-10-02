export interface Asset {
  id?: number;
  name: string;
  type: string;
  serialNumber?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAssetDto {
  name: string;
  type: string;
  serialNumber?: string;
  description?: string;
}

export interface EmployeeAsset {
  id?: number;
  employeeId: number;
  assetId: number;
  associatedAt?: string;
  employee?: Employee;
  asset?: Asset;
}

import { Employee } from './employee.model';