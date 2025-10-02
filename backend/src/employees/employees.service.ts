import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { EmployeesRepository } from './employees.repository';
import { CompaniesService } from '../companies/companies.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    private employeesRepository: EmployeesRepository,
    private companiesService: CompaniesService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<any> {
    // Check if company exists
    await this.companiesService.findOne(createEmployeeDto.companyId);

    // Check if CPF already exists
    const existingEmployeeByCpf = await this.employeesRepository.findByCpf(createEmployeeDto.cpf);
    if (existingEmployeeByCpf) {
      throw new ConflictException('Employee with this CPF already exists');
    }

    // Check if email already exists
    const existingEmployeeByEmail = await this.employeesRepository.findByEmail(createEmployeeDto.email);
    if (existingEmployeeByEmail) {
      throw new ConflictException('Employee with this email already exists');
    }

    return this.employeesRepository.create(createEmployeeDto);
  }

  async findAll(): Promise<any[]> {
    return this.employeesRepository.findAll();
  }

  async findOne(id: number): Promise<any> {
    const employee = await this.employeesRepository.findOne(id);
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<any> {
    // Check if employee exists
    await this.findOne(id);

    // If updating company, check if it exists
    if (updateEmployeeDto.companyId) {
      await this.companiesService.findOne(updateEmployeeDto.companyId);
    }

    // If updating CPF, check if it already exists
    if (updateEmployeeDto.cpf) {
      const existingEmployee = await this.employeesRepository.findByCpf(updateEmployeeDto.cpf);
      if (existingEmployee && existingEmployee.id !== id) {
        throw new ConflictException('Employee with this CPF already exists');
      }
    }

    // If updating email, check if it already exists
    if (updateEmployeeDto.email) {
      const existingEmployee = await this.employeesRepository.findByEmail(updateEmployeeDto.email);
      if (existingEmployee && existingEmployee.id !== id) {
        throw new ConflictException('Employee with this email already exists');
      }
    }

    return this.employeesRepository.update(id, updateEmployeeDto);
  }

  async remove(id: number): Promise<any> {
    // Check if employee exists
    await this.findOne(id);
    return this.employeesRepository.remove(id);
  }

  async findByCompany(companyId: number): Promise<any[]> {
    // Check if company exists
    await this.companiesService.findOne(companyId);
    return this.employeesRepository.findByCompany(companyId);
  }
}
