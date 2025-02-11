import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkbookNotes } from '../models/workbook-notes.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkbookNotesService
{
  private apiUrl = `${environment.apiUrl}workbooknotes`;

  constructor(private http: HttpClient) { }

  getWorkbookNote(): Observable<WorkbookNotes[]>
  {
    return this.http.get<WorkbookNotes[]>(this.apiUrl);
  }

  createWorkbookNote(workbookNote: WorkbookNotes): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, workbookNote);
  }

  getWorkbookNoteById(id: string): Observable<WorkbookNotes>
  {
    return this.http.get<WorkbookNotes>(`${this.apiUrl}/${id}`);
  }

  updateWorkbookNote(id: string, workbookNote: WorkbookNotes): Observable<WorkbookNotes>
  {
    return this.http.put<WorkbookNotes>(`${this.apiUrl}/${id}`, workbookNote);
  }

  deleteWorkbookNote(id: string): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
