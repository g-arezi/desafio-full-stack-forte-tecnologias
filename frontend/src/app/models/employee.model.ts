export interface Employee {
  id?: number;
  name: string;
  email: string;
  cpf?: string;
  position: string;
  companyId: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEmployeeDto {
  name: string;
  email: string;
  cpf: string;
  position: string;
  companyId: number;
}