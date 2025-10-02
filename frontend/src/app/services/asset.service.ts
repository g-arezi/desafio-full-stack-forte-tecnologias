import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Asset, CreateAssetDto, EmployeeAsset } from '../models/asset.model';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private apiUrl = 'http://localhost:3000/assets';
  private employeeAssetUrl = 'http://localhost:3000/employee-assets';

  constructor(private http: HttpClient) {}

  getAllAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.apiUrl)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getAssetById(id: number): Observable<Asset> {
    return this.http.get<Asset>(`${this.apiUrl}/${id}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  createAsset(asset: CreateAssetDto): Observable<Asset> {
    return this.http.post<Asset>(this.apiUrl, asset)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateAsset(id: number, asset: Partial<Asset>): Observable<Asset> {
    return this.http.patch<Asset>(`${this.apiUrl}/${id}`, asset)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteAsset(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Employee-Asset associations
  getEmployeeAssets(employeeId: number): Observable<EmployeeAsset[]> {
    return this.http.get<EmployeeAsset[]>(`${this.employeeAssetUrl}/employee/${employeeId}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  assignAssetToEmployee(employeeId: number, assetId: number): Observable<EmployeeAsset> {
    return this.http.post<EmployeeAsset>(this.employeeAssetUrl, { employeeId, assetId })
      .pipe(
        catchError(this.handleError)
      );
  }

  unassignAssetFromEmployee(employeeAssetId: number): Observable<void> {
    return this.http.delete<void>(`${this.employeeAssetUrl}/${employeeAssetId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAvailableAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(`${this.apiUrl}/available`)
      .pipe(
        retry(1),
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
    
    console.error('Erro no AssetService:', errorMessage);
    return throwError(() => new Error(errorMessage));  
  }
}