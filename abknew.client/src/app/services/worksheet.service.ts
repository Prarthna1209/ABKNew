import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Worksheets } from '../models/worksheets.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorksheetsService
{
  private apiUrl = `${environment.apiUrl}Worksheets`;

  constructor(private http: HttpClient) { }

  getWorksheets(): Observable<Worksheets[]>
  {
    return this.http.get<Worksheets[]>(this.apiUrl);
  }

  createWorksheetss(Worksheets: Worksheets): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, Worksheets);
  }

  getWorksheetssById(id: string): Observable<Worksheets>
  {
    return this.http.get<Worksheets>(`${this.apiUrl}/${id}`);
  }

  updateWorksheetss(Worksheets: Worksheets): Observable<boolean>
  {
    return this.http.post<boolean>(`${this.apiUrl}`, { _method: 'PUT', ...Worksheets });
  }

  deleteWorksheetss(id: string): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
