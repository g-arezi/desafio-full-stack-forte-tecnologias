import { IsNotEmpty, IsString, IsEmail, Matches, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({
    description: 'Employee name',
    example: 'João Silva'
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Employee email',
    example: 'joao.silva@forte.com.br'
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Employee CPF (Brazilian taxpayer ID)',
    example: '123.456.789-00'
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'CPF must be in format XXX.XXX.XXX-XX'
  })
  cpf: string;

  @ApiProperty({
    description: 'Employee position/role',
    example: 'Desenvolvedor Full Stack'
  })
  @IsNotEmpty()
  @IsString()
  position: string;

  @ApiProperty({
    description: 'Company ID that the employee belongs to',
    example: 1
  })
  @IsNotEmpty()
  @IsNumber()
  companyId: number;
}
