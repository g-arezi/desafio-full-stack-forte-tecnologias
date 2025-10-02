import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetService } from '../../services/asset.service';
import { Asset, CreateAssetDto } from '../../models/asset.model';

@Component({
  selector: 'app-assets',
  template: `
    <div class="assets-container">
      <div class="header">
        <button (click)="goBack()" class="btn-back">← Voltar</button>
        <h1>Gestão de Ativos</h1>
      </div>

      <div class="actions">
        <button (click)="showCreateForm = !showCreateForm" class="btn-primary">
          {{showCreateForm ? 'Cancelar' : 'Novo Ativo'}}
        </button>
      </div>

      <!-- Formulário de criação -->
      <div *ngIf="showCreateForm" class="create-form">
        <h3>Adicionar Novo Ativo</h3>
        <form (ngSubmit)="createAsset()" #assetForm="ngForm">
          <div class="form-group">
            <label for="name">Nome do Ativo:</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              [(ngModel)]="newAsset.name" 
              required 
              placeholder="Ex: MacBook Pro 13"
            >
          </div>
          
          <div class="form-group">
            <label for="type">Tipo:</label>
            <select 
              id="type" 
              name="type"
              [(ngModel)]="newAsset.type" 
              required
              class="form-control"
            >
              <option value="">-- Selecione um tipo --</option>
              <option value="NOTEBOOK">Notebook</option>
              <option value="MONITOR">Monitor</option>
              <option value="CELULAR">Celular</option>
              <option value="MOUSE">Mouse</option>
              <option value="TECLADO">Teclado</option>
              <option value="TABLET">Tablet</option>
            </select>
          </div>

          <div class="form-group">
            <label for="serialNumber">Número de Série:</label>
            <input 
              type="text" 
              id="serialNumber" 
              name="serialNumber"
              [(ngModel)]="newAsset.serialNumber" 
              placeholder="Ex: ABC123456789"
            >
          </div>
          
          <div class="form-group">
            <label for="description">Descrição:</label>
            <textarea 
              id="description" 
              name="description"
              [(ngModel)]="newAsset.description" 
              placeholder="Descrição detalhada do ativo"
              rows="3"
            ></textarea>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-primary" [disabled]="!assetForm.valid || isLoading">
              {{isLoading ? 'Criando...' : 'Criar Ativo'}}
            </button>
            <button type="button" (click)="cancelCreate()" class="btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>

      <!-- Lista de ativos -->
      <div class="assets-list">
        <h3>Todos os Ativos</h3>
        <div *ngIf="assets.length === 0" class="empty-state">
          <p>Nenhum ativo cadastrado ainda.</p>
          <p>Clique em "Novo Ativo" para começar!</p>
        </div>
        
        <div class="assets-grid">
          <div *ngFor="let asset of assets" class="asset-card" [class.assigned]="isAssetAssigned(asset)">
            <div class="asset-header">
              <h4>{{asset.name}}</h4>
              <span class="asset-type">{{getTypeLabel(asset.type)}}</span>
            </div>
            <div class="asset-info">
              <p *ngIf="asset.serialNumber"><strong>SN:</strong> {{asset.serialNumber}}</p>
              <p *ngIf="asset.description"><strong>Descrição:</strong> {{asset.description}}</p>
              <p><strong>Criado em:</strong> {{formatDate(asset.createdAt)}}</p>
              <div class="status-badge">
                <span [class]="getStatusClass(asset)">
                  {{getStatusLabel(asset)}}
                </span>
              </div>
            </div>
            <div class="asset-actions">
              <button (click)="editAsset(asset)" class="btn-secondary">Editar</button>
              <button (click)="deleteAsset(asset.id)" class="btn-danger">Excluir</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de edição -->
      <div *ngIf="showEditForm" class="modal-overlay" (click)="cancelEdit()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <h3>Editar Ativo</h3>
          <form (ngSubmit)="updateAsset()" #editForm="ngForm">
            <div class="form-group">
              <label for="editName">Nome do Ativo:</label>
              <input 
                type="text" 
                id="editName" 
                name="name"
                [(ngModel)]="editingAsset.name" 
                required
              >
            </div>
            
            <div class="form-group">
              <label for="editType">Tipo:</label>
              <select 
                id="editType" 
                name="type"
                [(ngModel)]="editingAsset.type" 
                required
                class="form-control"
              >
                <option value="NOTEBOOK">Notebook</option>
                <option value="MONITOR">Monitor</option>
                <option value="CELULAR">Celular</option>
                <option value="MOUSE">Mouse</option>
                <option value="TECLADO">Teclado</option>
                <option value="TABLET">Tablet</option>
              </select>
            </div>

            <div class="form-group">
              <label for="editSerialNumber">Número de Série:</label>
              <input 
                type="text" 
                id="editSerialNumber" 
                name="serialNumber"
                [(ngModel)]="editingAsset.serialNumber"
              >
            </div>
            
            <div class="form-group">
              <label for="editDescription">Descrição:</label>
              <textarea 
                id="editDescription" 
                name="description"
                [(ngModel)]="editingAsset.description" 
                rows="3"
              ></textarea>
            </div>
            
            <div class="form-actions">
              <button type="submit" class="btn-primary" [disabled]="!editForm.valid || isLoading">
                {{isLoading ? 'Salvando...' : 'Salvar'}}
              </button>
              <button type="button" (click)="cancelEdit()" class="btn-secondary">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .assets-container {
      max-width: 1200px;
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

    .actions {
      margin: 20px 0;
      text-align: center;
    }

    .btn-primary {
      background-color: #4caf50;
      color: white;
      border: none;
      padding: 12px 24px;
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

    .create-form {
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
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

    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
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

    .assets-list {
      margin-top: 30px;
    }

    .assets-list h3 {
      color: #333;
      border-bottom: 2px solid #1976d2;
      padding-bottom: 10px;
    }

    .empty-state {
      text-align: center;
      padding: 40px;
      color: #666;
    }

    .assets-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .asset-card {
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }

    .asset-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    .asset-card.assigned {
      background: #fff3cd;
      border-color: #ffeaa7;
    }

    .asset-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }

    .asset-header h4 {
      margin: 0;
      color: #333;
      font-size: 18px;
    }

    .asset-type {
      background: #1976d2;
      color: white;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      text-transform: uppercase;
    }

    .asset-info p {
      margin: 8px 0;
      color: #666;
      font-size: 14px;
    }

    .status-badge {
      margin: 10px 0;
    }

    .status-available {
      background: #d4edda;
      color: #155724;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
    }

    .status-assigned {
      background: #fff3cd;
      color: #856404;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
    }

    .asset-actions {
      margin-top: 15px;
      display: flex;
      gap: 5px;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      border-radius: 8px;
      padding: 30px;
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
    }

    .modal-content h3 {
      margin: 0 0 20px 0;
      color: #333;
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
export class AssetsComponent implements OnInit {
  assets: Asset[] = [];
  showCreateForm = false;
  showEditForm = false;
  isLoading = false;
  newAsset: CreateAssetDto = {
    name: '',
    type: '',
    serialNumber: '',
    description: ''
  };
  editingAsset: Asset = {} as Asset;

  constructor(
    private assetService: AssetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAssets();
  }

  loadAssets(): void {
    this.assetService.getAllAssets().subscribe({
      next: (assets) => {
        this.assets = assets || [];
      },
      error: (error) => {
        console.error('Erro ao carregar ativos:', error);
        alert('Erro ao carregar ativos: ' + error.message);
      }
    });
  }

  createAsset(): void {
    if (!this.newAsset.name || !this.newAsset.type) {
      alert('Por favor, preencha os campos obrigatórios!');
      return;
    }

    this.isLoading = true;

    this.assetService.createAsset(this.newAsset).subscribe({
      next: (asset) => {
        console.log('Ativo criado:', asset);
        this.loadAssets();
        this.cancelCreate();
        alert('Ativo criado com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao criar ativo:', error);
        alert('Erro ao criar ativo: ' + error.message);
        this.isLoading = false;
      }
    });
  }

  editAsset(asset: Asset): void {
    this.editingAsset = { ...asset };
    this.showEditForm = true;
  }

  updateAsset(): void {
    if (!this.editingAsset.name || !this.editingAsset.type) {
      alert('Por favor, preencha os campos obrigatórios!');
      return;
    }

    this.isLoading = true;

    this.assetService.updateAsset(this.editingAsset.id!, this.editingAsset).subscribe({
      next: (asset) => {
        console.log('Ativo atualizado:', asset);
        this.loadAssets();
        this.cancelEdit();
        alert('Ativo atualizado com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao atualizar ativo:', error);
        alert('Erro ao atualizar ativo: ' + error.message);
        this.isLoading = false;
      }
    });
  }

  deleteAsset(assetId: number | undefined): void {
    if (!assetId) return;

    if (confirm('Tem certeza que deseja excluir este ativo?')) {
      this.assetService.deleteAsset(assetId).subscribe({
        next: () => {
          alert('Ativo excluído com sucesso!');
          this.loadAssets();
        },
        error: (error) => {
          console.error('Erro ao excluir ativo:', error);
          alert('Erro ao excluir ativo: ' + error.message);
        }
      });
    }
  }

  cancelCreate(): void {
    this.showCreateForm = false;
    this.newAsset = {
      name: '',
      type: '',
      serialNumber: '',
      description: ''
    };
    this.isLoading = false;
  }

  cancelEdit(): void {
    this.showEditForm = false;
    this.editingAsset = {} as Asset;
    this.isLoading = false;
  }

  isAssetAssigned(asset: Asset): boolean {
    // Verifica se o ativo tem associações (esta lógica pode ser expandida)
    // Por enquanto, vamos usar um placeholder simples
    return Math.random() > 0.7; // Simula alguns ativos como associados
  }

  getTypeLabel(type: string): string {
    const types: { [key: string]: string } = {
      'NOTEBOOK': 'Notebook',
      'MONITOR': 'Monitor',
      'CELULAR': 'Celular',
      'MOUSE': 'Mouse',
      'TECLADO': 'Teclado',
      'TABLET': 'Tablet'
    };
    return types[type] || type;
  }

  getStatusClass(asset: Asset): string {
    return this.isAssetAssigned(asset) ? 'status-assigned' : 'status-available';
  }

  getStatusLabel(asset: Asset): string {
    return this.isAssetAssigned(asset) ? 'Associado' : 'Disponível';
  }

  goBack(): void {
    this.router.navigate(['/companies']);
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR');
  }
}