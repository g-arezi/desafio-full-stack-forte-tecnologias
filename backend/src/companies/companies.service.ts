import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CompaniesRepository } from './companies.repository';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from '@prisma/client';

@Injectable()
export class CompaniesService {
  constructor(private companiesRepository: CompaniesRepository) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    // Check if CNPJ already exists
    const existingCompany = await this.companiesRepository.findByCnpj(createCompanyDto.cnpj);
    if (existingCompany) {
      throw new ConflictException('Company with this CNPJ already exists');
    }

    return this.companiesRepository.create(createCompanyDto);
  }

  async findAll(): Promise<Company[]> {
    return this.companiesRepository.findAll();
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companiesRepository.findOne(id);
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    // Check if company exists
    await this.findOne(id);

    // If updating CNPJ, check if it already exists
    if (updateCompanyDto.cnpj) {
      const existingCompany = await this.companiesRepository.findByCnpj(updateCompanyDto.cnpj);
      if (existingCompany && existingCompany.id !== id) {
        throw new ConflictException('Company with this CNPJ already exists');
      }
    }

    return this.companiesRepository.update(id, updateCompanyDto);
  }

  async remove(id: number): Promise<Company> {
    // Check if company exists
    await this.findOne(id);
    return this.companiesRepository.remove(id);
  }
}