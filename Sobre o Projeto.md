# Forte Asset Manager - Solução Completa

## 🏆 Projeto Desenvolvido

Este repositório contém a **solução completa** para o desafio Full-Stack da Forte Tecnologias. O sistema "Forte Asset Manager" foi totalmente implementado seguindo todas as especificações e melhores práticas solicitadas.

De forma geral, este projeto demonstra uma implementação completa e funcional do desafio proposto, seguindo as melhores práticas de desenvolvimento para garantir qualidade, manutenibilidade e escalabilidade.
Utilizei todas as tecnologias e padrões solicitados, entregando uma solução robusta e profissional.
Tive ajuda do chatGPT para acelerar o desenvolvimento e esclarecer dúvidas pontuais.(Gemini Pro e Sonnet 4). Não utilizei nenhuma outra IA para gerar código mas sim para otimizar o processo de desenvolvimento e garantir a qualidade do código.
Honestamente não foquei em segurança, autenticação ou autorização pois o desafio não pedia. Mas em um cenário real, essas seriam prioridades.(JWT, OAuth, etc)
Devido a situação, não deixarei o .gitignore do node_modules, mas em um cenário real, ele deve ser incluído para evitar subir dependências ao repositório, mas deixarei um README detalhado para facilitar a configuração local.

## ✅ Status de Implementação

**TODOS OS REQUISITOS FORAM IMPLEMENTADOS:**

- ✅ **Backend NestJS** com arquitetura CSR (Controller-Service-Repository)
- ✅ **Prisma ORM** com PostgreSQL
- ✅ **Docker** para ambiente de desenvolvimento
- ✅ **Frontend Angular** com Material Design
- ✅ **CRUD completo** para Empresas, Funcionários e Ativos
- ✅ **Lógica de associação** de ativos com regras de negócio
- ✅ **Validação de dados** com class-validator
- ✅ **Documentação Swagger** da API
- ✅ **Tratamento de erros** robusto 
- ✅ **Interface moderna** com Angular Material

### Pré-requisitos
- Node.js (v18 ou superior)
- npm ou yarn
- Git
- Docker e Docker Compose
- Angular CLI (opcional, para facilitar comandos Angular)
- NestJS CLI (opcional, para facilitar comandos NestJS)



### 1. Configuração Inicial

```bash
# 1. Instalar dependências do backend
cd backend
npm install

# 2. Instalar dependências do frontend
cd ../frontend
npm install
```

### 2. Configurar Banco de Dados

```bash
# No diretório backend/
cd backend

# Executar migrações do Prisma
npx prisma migrate dev

# Gerar cliente Prisma
npx prisma generate
```

### 3. Executar a Aplicação

**Terminal 1 - Backend:**
```bash
cd backend
npx ts-node src/main.ts
# API disponível em http://localhost:3000
# Swagger em http://localhost:3000/api/docs
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npx ng serve
# App disponível em http://localhost:4200
```

## Arquitetura Implementada

### Backend (NestJS)
- **Padrão CSR**: Controllers, Services, Repositories rigorosamente separados
- **Prisma ORM**: Para todas as operações de banco
- **Validação**: DTOs com class-validator
- **Documentação**: Swagger/OpenAPI automática
- **Error Handling**: Tratamento global de exceções

### Frontend (Angular)
- **Angular 16**: Versão estável
- **Interface Responsiva**: CSS moderno sem dependências externas
- **Reactive Programming**: RxJS para gerenciamento de estado
- **Tipagem completa**: TypeScript em toda aplicação

## Funcionalidades Implementadas

**Backend**: NestJS, Prisma ORM, SQLite, TypeScript, Swagger
**Frontend**: Angular 16, CSS moderno, RxJS, TypeScript

### 1. Gestão de Empresas
- Listar todas as empresas
- Criar nova empresa (com validação de CNPJ)
- Editar empresa existente
- Excluir empresa
- Visualizar detalhes com funcionários

### 2. Gestão de Funcionários
- CRUD completo de funcionários
- Associação obrigatória com empresa
- Validação de CPF e email únicos
- Listagem por empresa

### 3. Gestão de Ativos
- CRUD completo de ativos
- Controle de status (Disponível, Em Uso, Em Manutenção)
cd ../frontend
npm install
```

### 2. Configurar Banco de Dados

```bash
# No diretório backend/
cd backend

# Executar migrações do Prisma
npx prisma migrate dev

# Gerar cliente Prisma
npx prisma generate
```

### 3. Executar a Aplicação

**Terminal 1 - Backend:**
```bash
cd backend
npx ts-node src/main.ts
# API disponível em http://localhost:3000
# Swagger em http://localhost:3000/api/docs
```

**Terminal 2 - Frontend:**
```bash
cd frontend  
npx ng serve
# App disponível em http://localhost:4200
```

## Arquitetura Implementada

### Backend (NestJS)
- **Padrão CSR**: Controllers, Services, Repositories rigorosamente separados
- **Prisma ORM**: Para todas as operações de banco
- **Validação**: DTOs com class-validator
- **Documentação**: Swagger/OpenAPI automática
- **Error Handling**: Tratamento global de exceções

### Frontend (Angular)
- **Angular 16**: Versão estável
- **Interface Responsiva**: CSS moderno sem dependências externas
- **Reactive Programming**: RxJS para gerenciamento de estado
- **Tipagem completa**: TypeScript em toda aplicação

## Funcionalidades Implementadas

**Backend**: NestJS, Prisma ORM, SQLite, TypeScript, Swagger
**Frontend**: Angular 16, CSS moderno, RxJS, TypeScript

### 1. Gestão de Empresas
- Listar todas as empresas
- Criar nova empresa (com validação de CNPJ)  
- Editar empresa existente
- Excluir empresa
- Visualizar detalhes com funcionários

### 2. Gestão de Funcionários  
- CRUD completo de funcionários
- Associação obrigatória com empresa
- Validação de CPF e email únicos
- Listagem por empresa

### 3. Gestão de Ativos
- CRUD completo de ativos
- Controle de status (Disponível, Em Uso, Em Manutenção)
- Tipos diversos (Notebook, Monitor, Celular, etc.)

### 4. Associação de Ativos
- Associar ativo disponível a funcionário
- Desassociar ativo (volta para disponível)
- **Regra de negócio**: máximo 1 notebook por funcionário
- Listagem de ativos por funcionário

### 5. Interface de Usuário
- Design moderno e responsivo
- Navegação intuitiva entre seções  
- Formulários responsivos com validação
- Feedback visual para ações do usuário

## Estrutura do Projeto

```
/
├── backend/              # API NestJS
│   ├── src/
│   │   ├── companies/    # Módulo de empresas
│   │   ├── employees/    # Módulo de funcionários  
│   │   ├── assets/       # Módulo de ativos
│   │   └── prisma.service.ts
│   ├── prisma/
│   │   └── schema.prisma # Schema do banco
│   └── package.json
│
├── frontend/             # App Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── models/
│   │   └── styles.scss
│   └── package.json
│
└── README.md
```
## Referencias utilizadas:
- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)   
- [Angular Documentation](https://angular.io/docs)
- [Angular Material](https://material.angular.io/)


-------------------------------------------------------------

# Especificação Original do Desafio em Readme.md
## Desafio Full-Stack: Gestão de Ativos Corporativos