import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { AssetService } from '../../services/asset.service';
import { Employee } from '../../models/employee.model';
import { Asset, EmployeeAsset } from '../../models/asset.model';

@Component({
  selector: 'app-employee-assets',
  template: `
    <div class="employee-assets-container">
      <div class="header">
        <button (click)="goBack()" class="btn-back">← Voltar</button>
        <h1>Gestão de Ativos</h1>
      </div>

      <div *ngIf="employee" class="employee-info-card">
        <h2>{{employee.name}}</h2>
        <p><strong>Email:</strong> {{employee.email}}</p>
        <p><strong>Cargo:</strong> {{employee.position}}</p>
      </div>

      <div class="assets-section">
        <div class="section-header">
          <h3>Ativos Associados</h3>
          <button (click)="showAssignForm = !showAssignForm" class="btn-primary">
            {{showAssignForm ? 'Cancelar' : 'Associar Ativo'}}
          </button>
        </div>

        <!-- Formulário de associação de ativo -->
        <div *ngIf="showAssignForm" class="assign-asset-form">
          <h4>Associar Novo Ativo</h4>
          <div class="form-group">
            <label for="assetSelect">Selecione um Ativo:</label>
            <select id="assetSelect" [(ngModel)]="selectedAssetId" class="form-control">
              <option value="">-- Selecione um ativo --</option>
              <option *ngFor="let asset of availableAssets" [value]="asset.id">
                {{asset.name}} - {{asset.type}} (SN: {{asset.serialNumber}})
              </option>
            </select>
          </div>
          
          <div class="form-actions">
            <button (click)="assignAsset()" class="btn-primary" [disabled]="!selectedAssetId || isLoading">
              {{isLoading ? 'Associando...' : 'Associar Ativo'}}
            </button>
            <button (click)="cancelAssign()" class="btn-secondary">Cancelar</button>
          </div>
        </div>

        <!-- Lista de ativos associados -->
        <div class="employee-assets-list">
          <div *ngIf="employeeAssets.length === 0" class="empty-state">
            <p>Nenhum ativo associado a este funcionário.</p>
            <p>Clique em "Associar Ativo" para começar!</p>
          </div>
          
          <div *ngFor="let employeeAsset of employeeAssets" class="asset-item">
            <div class="asset-info">
              <h4>{{employeeAsset.asset?.name}}</h4>
              <p><strong>Tipo:</strong> {{employeeAsset.asset?.type}}</p>
              <p><strong>Número de Série:</strong> {{employeeAsset.asset?.serialNumber}}</p>
              <p><strong>Descrição:</strong> {{employeeAsset.asset?.description || 'N/A'}}</p>
              <p><strong>Associado em:</strong> {{formatDate(employeeAsset.associatedAt)}}</p>
            </div>
            <div class="asset-actions">
              <button (click)="unassignAsset(employeeAsset.id)" class="btn-danger">Desassociar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Seção de todos os ativos para referência -->
      <div class="all-assets-section">
        <h3>Todos os Ativos Disponíveis</h3>
        <div class="assets-grid">
          <div *ngFor="let asset of allAssets" class="asset-card" 
               [class.assigned]="isAssetAssigned(asset.id)">
            <h4>{{asset.name}}</h4>
            <p><strong>Tipo:</strong> {{asset.type}}</p>
            <p><strong>SN:</strong> {{asset.serialNumber}}</p>
            <p><strong>Status:</strong> 
              <span [class]="isAssetAssigned(asset.id) ? 'status-assigned' : 'status-available'">
                {{isAssetAssigned(asset.id) ? 'Associado' : 'Disponível'}}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .employee-assets-container {
      max-width: 1000px;
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

    .employee-info-card {
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 30px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .employee-info-card h2 {
      color: #333;
      margin: 0 0 15px 0;
    }

    .employee-info-card p {
      margin: 8px 0;
      color: #666;
    }

    .assets-section, .all-assets-section {
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
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

    .section-header h3, .all-assets-section h3 {
      color: #333;
      margin: 0 0 20px 0;
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
      background-color: #6c757d;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      margin-left: 10px;
    }

    .btn-secondary:hover {
      background-color: #5a6268;
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

    .assign-asset-form {
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
    }

    .assign-asset-form h4 {
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

    .form-control {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
    }

    .form-control:focus {
      outline: none;
      border-color: #1976d2;
      box-shadow: 0 0 5px rgba(25, 118, 210, 0.3);
    }

    .form-actions {
      margin-top: 20px;
      text-align: right;
    }

    .employee-assets-list {
      margin-top: 20px;
    }

    .empty-state {
      text-align: center;
      padding: 40px;
      color: #666;
    }

    .asset-item {
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      padding: 15px;
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .asset-info h4 {
      margin: 0 0 8px 0;
      color: #333;
    }

    .asset-info p {
      margin: 4px 0;
      color: #666;
      font-size: 14px;
    }

    .assets-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 15px;
      margin-top: 15px;
    }

    .asset-card {
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      padding: 15px;
      transition: all 0.3s ease;
    }

    .asset-card.assigned {
      background: #fff3cd;
      border-color: #ffeaa7;
    }

    .asset-card h4 {
      margin: 0 0 10px 0;
      color: #333;
      font-size: 16px;
    }

    .asset-card p {
      margin: 5px 0;
      color: #666;
      font-size: 14px;
    }

    .status-available {
      color: #28a745;
      font-weight: bold;
    }

    .status-assigned {
      color: #ffc107;
      font-weight: bold;
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
export class EmployeeAssetsComponent implements OnInit {
  employee: Employee | null = null;
  employeeAssets: EmployeeAsset[] = [];
  availableAssets: Asset[] = [];
  allAssets: Asset[] = [];
  showAssignForm = false;
  selectedAssetId: number | '' = '';
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private assetService: AssetService
  ) {}

  ngOnInit(): void {
    const employeeId = Number(this.route.snapshot.paramMap.get('id'));
    if (employeeId) {
      this.loadEmployeeDetails(employeeId);
      this.loadEmployeeAssets(employeeId);
      this.loadAllAssets();
      this.loadAvailableAssets();
    }
  }

  loadEmployeeDetails(employeeId: number): void {
    this.employeeService.getEmployeeById(employeeId).subscribe({
      next: (employee) => {
        this.employee = employee;
      },
      error: (error) => {
        console.error('Erro ao carregar funcionário:', error);
        alert('Erro ao carregar detalhes do funcionário: ' + error.message);
      }
    });
  }

  loadEmployeeAssets(employeeId: number): void {
    this.assetService.getEmployeeAssets(employeeId).subscribe({
      next: (assets) => {
        this.employeeAssets = assets || [];
      },
      error: (error) => {
        console.error('Erro ao carregar ativos do funcionário:', error);
        this.employeeAssets = [];
      }
    });
  }

  loadAvailableAssets(): void {
    this.assetService.getAvailableAssets().subscribe({
      next: (assets) => {
        this.availableAssets = assets || [];
      },
      error: (error) => {
        console.error('Erro ao carregar ativos disponíveis:', error);
        this.availableAssets = [];
        // Fallback: usar todos os ativos se não houver endpoint específico
        this.availableAssets = this.allAssets;
      }
    });
  }

  loadAllAssets(): void {
    this.assetService.getAllAssets().subscribe({
      next: (assets) => {
        this.allAssets = assets || [];
      },
      error: (error) => {
        console.error('Erro ao carregar todos os ativos:', error);
        this.allAssets = [];
      }
    });
  }

  assignAsset(): void {
    if (!this.selectedAssetId) {
      alert('Por favor, selecione um ativo!');
      return;
    }

    if (!this.employee?.id) {
      alert('ID do funcionário não encontrado!');
      return;
    }

    this.isLoading = true;

    this.assetService.assignAssetToEmployee(this.employee.id, Number(this.selectedAssetId)).subscribe({
      next: (employeeAsset) => {
        console.log('Ativo associado:', employeeAsset);
        this.loadEmployeeAssets(this.employee!.id!);
        this.loadAvailableAssets();
        this.cancelAssign();
        alert('Ativo associado com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao associar ativo:', error);
        alert('Erro ao associar ativo: ' + error.message);
        this.isLoading = false;
      }
    });
  }

  unassignAsset(employeeAssetId: number | undefined): void {
    if (!employeeAssetId) {
      alert('ID da associação não encontrado!');
      return;
    }

    if (confirm('Tem certeza que deseja desassociar este ativo?')) {
      this.assetService.unassignAssetFromEmployee(employeeAssetId).subscribe({
        next: () => {
          alert('Ativo desassociado com sucesso!');
          this.loadEmployeeAssets(this.employee!.id!);
          this.loadAvailableAssets();
        },
        error: (error) => {
          console.error('Erro ao desassociar ativo:', error);
          alert('Erro ao desassociar ativo: ' + error.message);
        }
      });
    }
  }

  cancelAssign(): void {
    this.showAssignForm = false;
    this.selectedAssetId = '';
    this.isLoading = false;
  }

  isAssetAssigned(assetId: number | undefined): boolean {
    if (!assetId) return false;
    return this.employeeAssets.some(ea => ea.asset?.id === assetId);
  }

  goBack(): void {
    // Voltar para a página de detalhes da empresa
    if (this.employee?.companyId) {
      this.router.navigate(['/company', this.employee.companyId]);
    } else {
      this.router.navigate(['/companies']);
    }
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR');
  }
}