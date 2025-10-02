import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService, Company } from '../../services/company.service';
import { EmployeeService } from '../../services/employee.service';
import { Employee, CreateEmployeeDto } from '../../models/employee.model';

@Component({
  selector: 'app-company-detail',
  template: `
    <div class="company-detail-container">
      <div class="header">
        <button (click)="goBack()" class="btn-back">← Voltar</button>
        <h1>Detalhes da Empresa</h1>
      </div>

      <div *ngIf="company" class="company-info-card">
        <h2>{{company.name}}</h2>
        <p><strong>CNPJ:</strong> {{company.cnpj}}</p>
        <p><strong>Criado em:</strong> {{formatDate(company.createdAt)}}</p>
      </div>

      <div class="employees-section">
        <div class="section-header">
          <h3>Funcionários</h3>
          <button (click)="showAddEmployeeForm = !showAddEmployeeForm" class="btn-primary">
            {{showAddEmployeeForm ? 'Cancelar' : 'Adicionar Funcionário'}}
          </button>
        </div>

        <!-- Formulário de adição de funcionário -->
        <div *ngIf="showAddEmployeeForm" class="add-employee-form">
          <h4>Novo Funcionário</h4>
          <form (ngSubmit)="addEmployee()" #employeeForm="ngForm">
            <div class="form-group">
              <label for="name">Nome:</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                [(ngModel)]="newEmployee.name" 
                required 
                placeholder="Nome completo do funcionário"
              >
            </div>
            
            <div class="form-group">
              <label for="email">Email:</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                [(ngModel)]="newEmployee.email" 
                required 
                placeholder="email@exemplo.com"
              >
            </div>
            
            <div class="form-group">
              <label for="cpf">CPF:</label>
              <input 
                type="text" 
                id="cpf" 
                name="cpf"
                [(ngModel)]="newEmployee.cpf" 
                required 
                placeholder="000.000.000-00"
              >
            </div>
            
            <div class="form-group">
              <label for="position">Cargo:</label>
              <input 
                type="text" 
                id="position" 
                name="position"
                [(ngModel)]="newEmployee.position" 
                required 
                placeholder="Ex: Desenvolvedor, Analista, Gerente"
              >
            </div>
            
            <div class="form-actions">
              <button type="submit" class="btn-primary" [disabled]="!employeeForm.valid || isLoading">
                {{isLoading ? 'Adicionando...' : 'Adicionar Funcionário'}}
              </button>
              <button type="button" (click)="cancelAddEmployee()" class="btn-secondary">Cancelar</button>
            </div>
          </form>
        </div>

        <!-- Lista de funcionários -->
        <div class="employees-list">
          <div *ngIf="employees.length === 0" class="empty-state">
            <p>Nenhum funcionário cadastrado ainda.</p>
            <p>Clique em "Adicionar Funcionário" para começar!</p>
          </div>
          
          <div *ngFor="let employee of employees" class="employee-item">
            <div class="employee-info">
              <h4>{{employee.name}}</h4>
              <p><strong>Email:</strong> {{employee.email}}</p>
              <p><strong>Cargo:</strong> {{employee.position}}</p>
              <p><strong>Contratado em:</strong> {{formatDate(employee.createdAt)}}</p>
            </div>
            <div class="employee-actions">
              <button (click)="manageAssets(employee.id)" class="btn-secondary">Gerenciar Ativos</button>
              <button (click)="deleteEmployee(employee.id)" class="btn-danger">Excluir</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .company-detail-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      gap: 15px;
    }

    .btn-back {
      background-color: #6c757d;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }

    .btn-back:hover {
      background-color: #5a6268;
    }

    h1 {
      color: #1976d2;
      margin: 0;
    }

    .company-info-card {
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 30px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .company-info-card h2 {
      color: #333;
      margin: 0 0 15px 0;
    }

    .company-info-card p {
      margin: 8px 0;
      color: #666;
    }

    .employees-section {
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      border-bottom: 2px solid #1976d2;
      padding-bottom: 10px;
    }

    .section-header h3 {
      color: #333;
      margin: 0;
    }

    .btn-primary {
      background-color: #4caf50;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }

    .btn-primary:hover {
      background-color: #45a049;
    }

    .btn-secondary {
      background-color: #17a2b8;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      margin-right: 5px;
    }

    .btn-secondary:hover {
      background-color: #138496;
    }

    .btn-danger {
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }

    .btn-danger:hover {
      background-color: #c82333;
    }

    .add-employee-form {
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
    }

    .add-employee-form h4 {
      color: #333;
      margin: 0 0 15px 0;
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #333;
    }

    .form-group input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
    }

    .form-group input:focus {
      outline: none;
      border-color: #1976d2;
      box-shadow: 0 0 5px rgba(25, 118, 210, 0.3);
    }

    .form-actions {
      margin-top: 20px;
      text-align: right;
    }

    .form-actions button {
      margin-left: 10px;
    }

    .employees-list {
      margin-top: 20px;
    }

    .empty-state {
      text-align: center;
      padding: 40px;
      color: #666;
    }

    .employee-item {
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      padding: 15px;
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .employee-info h4 {
      margin: 0 0 8px 0;
      color: #333;
    }

    .employee-info p {
      margin: 4px 0;
      color: #666;
      font-size: 14px;
    }

    .employee-actions {
      display: flex;
      gap: 5px;
    }

    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    button:disabled:hover {
      background-color: #ccc;
    }
  `]
})
export class CompanyDetailComponent implements OnInit {
  company: Company | null = null;
  employees: Employee[] = [];
  showAddEmployeeForm = false;
  isLoading = false;
  newEmployee: CreateEmployeeDto = {
    name: '',
    email: '',
    cpf: '',
    position: '',
    companyId: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const companyId = Number(this.route.snapshot.paramMap.get('id'));
    if (companyId) {
      this.newEmployee.companyId = companyId;
      this.loadCompanyDetails(companyId);
      this.loadEmployees(companyId);
    }
  }

  loadCompanyDetails(companyId: number): void {
    this.companyService.getById(companyId).subscribe({
      next: (company) => {
        this.company = company;
      },
      error: (error) => {
        console.error('Erro ao carregar empresa:', error);
        alert('Erro ao carregar detalhes da empresa: ' + error.message);
      }
    });
  }

  loadEmployees(companyId: number): void {
    this.employeeService.getEmployeesByCompany(companyId).subscribe({
      next: (employees) => {
        this.employees = employees || [];
      },
      error: (error) => {
        console.error('Erro ao carregar funcionários:', error);
        this.employees = [];
      }
    });
  }

  addEmployee(): void {
    if (!this.newEmployee.name || !this.newEmployee.email || !this.newEmployee.cpf || !this.newEmployee.position) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    this.isLoading = true;
    
    this.employeeService.createEmployee(this.newEmployee).subscribe({
      next: (employee) => {
        console.log('Funcionário adicionado:', employee);
        this.loadEmployees(this.newEmployee.companyId);
        this.cancelAddEmployee();
        alert('Funcionário adicionado com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao adicionar funcionário:', error);
        alert('Erro ao adicionar funcionário: ' + error.message);
        this.isLoading = false;
      }
    });
  }

  cancelAddEmployee(): void {
    this.showAddEmployeeForm = false;
    this.newEmployee = {
      name: '',
      email: '',
      cpf: '',
      position: '',
      companyId: this.newEmployee.companyId
    };
    this.isLoading = false;
  }

  deleteEmployee(employeeId: number): void {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      this.employeeService.deleteEmployee(employeeId).subscribe({
        next: () => {
          alert('Funcionário excluído com sucesso!');
          this.loadEmployees(this.newEmployee.companyId);
        },
        error: (error) => {
          console.error('Erro ao excluir funcionário:', error);
          alert('Erro ao excluir funcionário: ' + error.message);
        }
      });
    }
  }

  manageAssets(employeeId: number): void {
    this.router.navigate(['/employee', employeeId, 'assets']);
  }

  goBack(): void {
    this.router.navigate(['/companies']);
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR');
  }
}