import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Company {
  id: number;
  name: string;
  cnpj: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCompanyDto {
  name: string;
  cnpj: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.baseUrl}/companies`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getById(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.baseUrl}/companies/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  create(company: CreateCompanyDto): Observable<Company> {
    return this.http.post<Company>(`${this.baseUrl}/companies`, company)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(id: number, company: Partial<CreateCompanyDto>): Observable<Company> {
    return this.http.patch<Company>(`${this.baseUrl}/companies/${id}`, company)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/companies/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Erro completo:', error);
    
    let errorMessage = 'Erro desconhecido';
    
    if (error.status === 0) {
      errorMessage = 'Não foi possível conectar ao servidor. Verifique se o backend está rodando na porta 3000.';
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    } else {
      errorMessage = `Erro HTTP ${error.status}: ${error.statusText}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}