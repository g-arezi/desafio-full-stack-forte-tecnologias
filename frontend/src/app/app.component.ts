import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar">
      <div class="nav-content">
        <span class="title">Forte Asset Manager</span>
        <div class="spacer"></div>
        <button routerLink="/companies">Empresas</button>
      </div>
    </nav>
    
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .navbar {
      background-color: #1976d2;
      color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .nav-content {
      display: flex;
      align-items: center;
      padding: 16px 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .title {
      font-size: 20px;
      font-weight: 500;
    }
    
    .spacer {
      flex: 1 1 auto;
    }
    
    .navbar button {
      background: none;
      border: none;
      color: white;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
    }
    
    .navbar button:hover {
      background-color: rgba(255,255,255,0.1);
    }
    
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class AppComponent {
  title = 'Forte Asset Manager';
}