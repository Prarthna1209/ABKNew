import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkbookNotesWorksheet } from '../models/workbook-notes-worksheet.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkbookNotesWorksheetService
{
  private apiUrl = `${environment.apiUrl}WorkbookNotesWorksheet`;

  constructor(private http: HttpClient) { }

  getWorkbookNotesWorksheets(): Observable<WorkbookNotesWorksheet[]>
  {
    return this.http.get<WorkbookNotesWorksheet[]>(this.apiUrl);
  }

  createWorkbookNotesWorksheets(WorkbookNotesWorksheet: WorkbookNotesWorksheet): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, WorkbookNotesWorksheet);
  }

  getWorkbookNotesWorksheetsById(id: string): Observable<WorkbookNotesWorksheet>
  {
    return this.http.get<WorkbookNotesWorksheet>(`${this.apiUrl}/${id}`);
  }

  updateWorkbookNotesWorksheets(WorkbookNotesWorksheet: WorkbookNotesWorksheet): Observable<boolean>
  {
    return this.http.post<boolean>(`${this.apiUrl}`, { _method: 'PUT', ...WorkbookNotesWorksheet });
  }

  deleteWorkbookNotesWorksheets(id: string): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
