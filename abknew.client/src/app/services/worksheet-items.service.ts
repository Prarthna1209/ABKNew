import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorksheetItems } from '../models/worksheetItems.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorksheetItemsService
{
  private apiUrl = `${environment.apiUrl}WorksheetItems`;

  constructor(private http: HttpClient) { }

  getWorksheetItemsss(): Observable<WorksheetItems[]>
  {
    return this.http.get<WorksheetItems[]>(this.apiUrl);
  }

  createWorksheetItemss(WorksheetItems: WorksheetItems): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, WorksheetItems);
  }

  getWorksheetItemssById(id: string): Observable<WorksheetItems>
  {
    return this.http.get<WorksheetItems>(`${this.apiUrl}/${id}`);
  }

  updateWorksheetItemss(WorksheetItems: WorksheetItems): Observable<boolean>
  {
    return this.http.post<boolean>(`${this.apiUrl}`, { _method: 'PUT', ...WorksheetItems });
  }

  deleteWorksheetItemss(id: string): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
