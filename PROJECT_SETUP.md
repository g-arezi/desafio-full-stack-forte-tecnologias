# Forte Asset Manager

This project implements a full-stack asset management system for Forte Tecnologias, built with NestJS (backend) and Angular (frontend).

## Project Structure

```
/
├── backend/         # NestJS API
├── frontend/        # Angular application
├── docker-compose.yml
└── README.md
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker and Docker Compose
- Git

## Setup Instructions

### 1. Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd forte-asset-manager

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Database Setup

```bash
# Start PostgreSQL with Docker
docker-compose up -d

# Run Prisma migrations (from backend directory)
cd backend
npx prisma migrate dev
npx prisma generate
```

### 3. Environment Configuration

Create `.env` file in the backend directory:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/forte_asset_manager?schema=public"
PORT=3000
```

### 4. Running the Application

#### Backend (API)
```bash
cd backend
npm run start:dev
# API will be available at http://localhost:3000
# Swagger docs at http://localhost:3000/api/docs
```

#### Frontend (Web App)
```bash
cd frontend
npm start
# App will be available at http://localhost:4200
```

## Features

### Backend (NestJS)
- **Architecture**: Controller-Service-Repository (CSR) pattern
- **Database**: PostgreSQL with Prisma ORM
- **API Documentation**: Swagger/OpenAPI
- **Validation**: class-validator and class-transformer
- **Error Handling**: Global exception filters

### Frontend (Angular)
- **UI Framework**: Angular Material
- **State Management**: Reactive forms and services
- **Routing**: Angular Router
- **HTTP Client**: Angular HttpClient

### Core Functionality
1. **Companies Management**: CRUD operations for companies
2. **Employees Management**: CRUD operations for employees with company association
3. **Assets Management**: CRUD operations for assets with status tracking
4. **Asset Association**: Assign/unassign assets to/from employees
5. **Business Rules**: One notebook per employee restriction

## API Endpoints

### Companies
- `GET /companies` - List all companies
- `GET /companies/:id` - Get company by ID
- `POST /companies` - Create new company
- `PATCH /companies/:id` - Update company
- `DELETE /companies/:id` - Delete company

### Employees
- `GET /employees` - List all employees
- `GET /employees/:id` - Get employee by ID
- `POST /employees` - Create new employee
- `PATCH /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee
- `GET /companies/:id/employees` - Get employees by company

### Assets
- `GET /assets` - List all assets
- `GET /assets/:id` - Get asset by ID
- `POST /assets` - Create new asset
- `PATCH /assets/:id` - Update asset
- `DELETE /assets/:id` - Delete asset
- `GET /employees/:id/assets` - Get assets by employee

### Asset Management
- `POST /employees/:employeeId/assets/:assetId` - Assign asset to employee
- `DELETE /employees/:employeeId/assets/:assetId` - Unassign asset from employee

## Database Schema

### Entities
- **Company**: id, name, cnpj, timestamps
- **Employee**: id, name, email, cpf, companyId, timestamps
- **Asset**: id, name, type, status, timestamps
- **EmployeeAsset**: id, employeeId, assetId, associatedAt (junction table)

### Business Rules
- Company CNPJ must be unique
- Employee email and CPF must be unique
- Employee must belong to a company
- Asset can have status: DISPONIVEL, EM_USO, EM_MANUTENCAO
- Asset types: NOTEBOOK, MONITOR, CELULAR, MOUSE, TECLADO, TABLET
- One employee can have maximum one NOTEBOOK asset

## Development

### Database Operations
```bash
# Reset database
npx prisma migrate reset

# View data in Prisma Studio
npx prisma studio

# Generate Prisma client after schema changes
npx prisma generate
```

### Testing
```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend
npm run test
```

## Deployment

### Production Build
```bash
# Build backend
cd backend
npm run build

# Build frontend
cd frontend
npm run build
```

## Technologies Used

### Backend
- NestJS
- Prisma ORM
- PostgreSQL
- TypeScript
- Swagger
- class-validator
- class-transformer

### Frontend
- Angular 17
- Angular Material
- RxJS
- TypeScript
- SCSS

### DevOps
- Docker
- Docker Compose
- Git

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary software of Forte Tecnologias.