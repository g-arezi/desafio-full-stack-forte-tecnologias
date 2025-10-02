import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { EmployeeAssetsComponent } from './components/employee-assets/employee-assets.component';
import { AssetsComponent } from './components/assets/assets.component';

const routes: Routes = [
  { path: '', redirectTo: '/companies', pathMatch: 'full' },
  { path: 'companies', component: CompaniesComponent },
  { path: 'company/:id', component: CompanyDetailComponent },
  { path: 'employee/:id/assets', component: EmployeeAssetsComponent },
  { path: 'assets', component: AssetsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }