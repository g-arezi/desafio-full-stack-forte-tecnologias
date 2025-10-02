import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Employee, CreateEmployeeDto } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getEmployeesByCompany(companyId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/company/${companyId}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  createEmployee(employee: CreateEmployeeDto): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateEmployee(id: number, employee: Partial<Employee>): Observable<Employee> {
    return this.http.patch<Employee>(`${this.apiUrl}/${id}`, employee)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido!';
    
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      errorMessage = `Erro ${error.status}: ${error.message}`;
      if (error.error && error.error.message) {
        errorMessage += ` - ${error.error.message}`;
      }
    }
    
    console.error('Erro no EmployeeService:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}