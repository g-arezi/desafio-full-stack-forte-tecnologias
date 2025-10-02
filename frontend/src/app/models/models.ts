export interface Company {
  id: number;
  name: string;
  cnpj: string;
  employees?: Employee[];
  createdAt: string;
  updatedAt: string;
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  cpf: string;
  companyId: number;
  company?: Company;
  assets?: EmployeeAsset[];
  createdAt: string;
  updatedAt: string;
}

export interface Asset {
  id: number;
  name: string;
  type: AssetType;
  status: AssetStatus;
  employees?: EmployeeAsset[];
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeAsset {
  id: number;
  employeeId: number;
  assetId: number;
  employee?: Employee;
  asset?: Asset;
  associatedAt: string;
}

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

// DTOs for API calls
export interface CreateCompanyDto {
  name: string;
  cnpj: string;
}

export interface CreateEmployeeDto {
  name: string;
  email: string;
  cpf: string;
  companyId: number;
}

export interface CreateAssetDto {
  name: string;
  type: AssetType;
}