import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { EmployeeAssetsComponent } from './components/employee-assets/employee-assets.component';
import { AssetsComponent } from './components/assets/assets.component';

@NgModule({
  declarations: [
    AppComponent,
    CompaniesComponent,
    CompanyDetailComponent,
    EmployeeAssetsComponent,
    AssetsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }