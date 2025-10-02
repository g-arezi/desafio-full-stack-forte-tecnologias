import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Limpar dados existentes
  await prisma.employeeAsset.deleteMany();
  await prisma.asset.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.company.deleteMany();

  // Criar empresas de exemplo
  const company1 = await prisma.company.create({
    data: {
      name: 'Forte Tecnologias LTDA',
      cnpj: '12.345.678/0001-90',
    },
  });

  const company2 = await prisma.company.create({
    data: {
      name: 'Tech Solutions S.A.',
      cnpj: '98.765.432/0001-10',
    },
  });

  // Criar funcionários de exemplo
  const employee1 = await prisma.employee.create({
    data: {
      name: 'João Silva',
      email: 'joao.silva@forte.com.br',
      cpf: '123.456.789-00',
      position: 'Desenvolvedor Full Stack',
      companyId: company1.id,
    },
  });

  const employee2 = await prisma.employee.create({
    data: {
      name: 'Maria Santos',
      email: 'maria.santos@forte.com.br',
      cpf: '987.654.321-00',
      position: 'Designer UX/UI',
      companyId: company1.id,
    },
  });

  const employee3 = await prisma.employee.create({
    data: {
      name: 'Pedro Costa',
      email: 'pedro.costa@techsolutions.com',
      cpf: '456.789.123-00',
      position: 'Gerente de Projetos',
      companyId: company2.id,
    },
  });

  // Criar ativos de exemplo
  const asset1 = await prisma.asset.create({
    data: {
      name: 'MacBook Pro 13"',
      type: 'NOTEBOOK',
      serialNumber: 'MBP2021001',
      description: 'MacBook Pro 13" 2021 com chip M1',
      status: 'DISPONIVEL',
    },
  });

  const asset2 = await prisma.asset.create({
    data: {
      name: 'Monitor Dell 24"',
      type: 'MONITOR',
      serialNumber: 'DELL24001',
      description: 'Monitor Dell 24" Full HD',
      status: 'DISPONIVEL',
    },
  });

  const asset3 = await prisma.asset.create({
    data: {
      name: 'iPhone 12',
      type: 'CELULAR',
      serialNumber: 'IP12001',
      description: 'iPhone 12 128GB Azul',
      status: 'DISPONIVEL',
    },
  });

  const asset4 = await prisma.asset.create({
    data: {
      name: 'Mouse Logitech MX Master',
      type: 'MOUSE',
      serialNumber: 'MX001',
      description: 'Mouse sem fio Logitech MX Master 3',
      status: 'DISPONIVEL',
    },
  });

  const asset5 = await prisma.asset.create({
    data: {
      name: 'Teclado Mecânico',
      type: 'TECLADO',
      serialNumber: 'KB001',
      description: 'Teclado mecânico RGB 60%',
      status: 'DISPONIVEL',
    },
  });

  // Criar algumas associações de exemplo
  await prisma.employeeAsset.create({
    data: {
      employeeId: employee1.id,
      assetId: asset1.id,
    },
  });

  await prisma.employeeAsset.create({
    data: {
      employeeId: employee1.id,
      assetId: asset4.id,
    },
  });

  await prisma.employeeAsset.create({
    data: {
      employeeId: employee2.id,
      assetId: asset2.id,
    },
  });

  console.log('Dados de exemplo criados com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });