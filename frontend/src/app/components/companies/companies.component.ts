import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService, Company, CreateCompanyDto } from '../../services/company.service';

@Component({
  selector: 'app-companies',
  template: `
    <div class="companies-container">
      <h1>Forte Asset Manager</h1>
      <p>Sistema de gerenciamento de ativos da Forte Tecnologias</p>
      
      <div class="actions">
        <button (click)="showCreateForm = !showCreateForm">Nova Empresa</button>
        <button (click)="navigateToAssets()" class="btn-secondary">Gerenciar Ativos</button>
      </div>

      <!-- Formulário de criação -->
      <div *ngIf="showCreateForm" class="create-form">
        <h3>Adicionar Nova Empresa</h3>
        <form (ngSubmit)="createCompany($event)" #companyForm="ngForm">
          <div class="form-group">
            <label for="name">Nome da Empresa:</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              [(ngModel)]="newCompany.name" 
              required 
              placeholder="Ex: Forte Tecnologias LTDA"
            >
          </div>
          
          <div class="form-group">
            <label for="cnpj">CNPJ:</label>
            <input 
              type="text" 
              id="cnpj" 
              name="cnpj"
              [(ngModel)]="newCompany.cnpj" 
              required 
              placeholder="Ex: 12.345.678/0001-90"
            >
            <small>Formato: XX.XXX.XXX/XXXX-XX</small>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-primary" [disabled]="!companyForm.valid || isLoading">{{isLoading ? 'Criando...' : 'Criar Empresa'}}</button>
            <button type="button" (click)="cancelCreate()" class="btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>

      <!-- Lista de empresas -->
      <div class="companies-list">
        <h3>Empresas Cadastradas</h3>
        <div *ngIf="companies.length === 0" class="empty-state">
          <p>Nenhuma empresa cadastrada ainda.</p>
          <p>Clique em "Nova Empresa" para começar!</p>
        </div>
        
        <div *ngFor="let company of companies" class="company-item">
          <div class="company-info">
            <h4>{{company.name}}</h4>
            <p>CNPJ: {{company.cnpj}}</p>
            <p>Criado em: {{formatDate(company.createdAt)}}</p>
          </div>
          <div class="company-actions">
            <button (click)="viewCompanyDetails(company.id)" class="btn-primary">Ver Detalhes</button>
            <button (click)="deleteCompany(company.id)" class="btn-danger">Excluir</button>
          </div>
        </div>
      </div>

      <div class="info-card">
        <div class="card-header">
          <h3>Sistema Funcionando!</h3>
        </div>
        <div class="card-content">
          <p><strong>Backend NestJS:</strong> http://localhost:3000/companies</p>
          <p><strong>Swagger API:</strong> http://localhost:3000/api/docs</p>
          <p><strong>Frontend Angular:</strong> http://localhost:4200</p>
          <p><strong>Banco de Dados:</strong> SQLite configurado</p>
          
          <div class="status">
            <span class="chip accent">Backend Online</span>
            <span class="chip primary">Frontend Online</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .companies-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      text-align: center;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    h1 {
      color: #1976d2;
      margin-bottom: 8px;
      font-size: 2.5em;
    }

    .actions {
      margin: 20px 0;
    }

    button {
      background-color: #1976d2;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      margin: 0 5px;
    }

    button:hover {
      background-color: #1565c0;
    }

    .btn-secondary {
      background-color: #17a2b8;
      margin-left: 10px;
    }

    .btn-secondary:hover {
      background-color: #138496;
    }

    .btn-primary {
      background-color: #4caf50;
    }

    .btn-primary:hover {
      background-color: #45a049;
    }

    .btn-secondary {
      background-color: #6c757d;
    }

    .btn-secondary:hover {
      background-color: #5a6268;
    }

    .btn-danger {
      background-color: #f44336;
    }

    .btn-danger:hover {
      background-color: #da190b;
    }

    .create-form {
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      text-align: left;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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

    .companies-list {
      margin-top: 30px;
      text-align: left;
    }

    .companies-list h3 {
      color: #333;
      border-bottom: 2px solid #1976d2;
      padding-bottom: 10px;
    }

    .empty-state {
      text-align: center;
      padding: 40px;
      color: #666;
    }

    .company-item {
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .company-info h4 {
      margin: 0 0 5px 0;
      color: #333;
    }

    .company-info p {
      margin: 2px 0;
      color: #666;
      font-size: 14px;
    }

    small {
      color: #888;
      font-size: 12px;
      font-style: italic;
    }

    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    button:disabled:hover {
      background-color: #ccc;
    }

    .info-card {
      margin-top: 20px;
      text-align: left;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .card-header {
      padding: 16px;
      border-bottom: 1px solid #eee;
    }

    .card-header h3 {
      margin: 0;
      color: #333;
    }

    .card-content {
      padding: 16px;
    }

    .status {
      margin-top: 16px;
      text-align: center;
    }

    .chip {
      display: inline-block;
      padding: 4px 12px;
      margin: 0 4px;
      border-radius: 16px;
      font-size: 12px;
      color: white;
    }

    .chip.accent {
      background-color: #ff4081;
    }

    .chip.primary {
      background-color: #1976d2;
    }

    p {
      margin: 8px 0;
    }
  `]
})
export class CompaniesComponent {
  showCreateForm = false;
  companies: Company[] = [];
  isLoading = false;
  newCompany: CreateCompanyDto = {
    name: '',
    cnpj: ''
  };

  constructor(
    private companyService: CompanyService,
    private router: Router
  ) {
    this.loadCompanies();
  }

  loadCompanies() {
    console.log('Carregando empresas...');
    this.companyService.getAll()
      .subscribe({
        next: (companies) => {
          console.log('Empresas carregadas:', companies);
          this.companies = companies || [];
        },
        error: (error) => {
          console.error('Erro ao carregar empresas:', error);
          this.companies = [];
          alert('Erro ao carregar empresas: ' + error.message);
        }
      });
  }

  createCompany(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    
    console.log('Tentando criar empresa:', this.newCompany);
    
    if (!this.newCompany.name || !this.newCompany.cnpj) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
    
    this.isLoading = true;
    
    this.companyService.create(this.newCompany)
      .subscribe({
        next: (response) => {
          console.log('Empresa criada com sucesso:', response);
          this.loadCompanies();
          this.cancelCreate();
          alert('Empresa criada com sucesso!');
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erro ao criar empresa:', error);
          this.isLoading = false;
          alert('Erro ao criar empresa: ' + error.message);
        }
      });
  }

  cancelCreate() {
    this.showCreateForm = false;
    this.newCompany = {
      name: '',
      cnpj: ''
    };
    this.isLoading = false;
  }

  deleteCompany(id: number) {
    if (confirm('Tem certeza que deseja excluir esta empresa?')) {
      this.companyService.delete(id)
        .subscribe({
          next: () => {
            alert('Empresa excluída com sucesso!');
            this.loadCompanies();
          },
          error: (error) => {
            console.error('Erro ao excluir empresa:', error);
            alert('Erro ao excluir empresa: ' + error.message);
          }
        });
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('pt-BR');
  }

  viewCompanyDetails(companyId: number) {
    this.router.navigate(['/company', companyId]);
  }

  navigateToAssets() {
    this.router.navigate(['/assets']);
  }
}