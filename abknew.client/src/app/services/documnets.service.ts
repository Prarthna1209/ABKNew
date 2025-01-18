import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Documents } from '../models/documents.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private apiUrl = 'https://localhost:7002/api/documents';

  constructor(private http: HttpClient) { }

  getDocuments(id: string): Observable<Documents[]>
  {
    return this.http.get<Documents[]>(`${this.apiUrl}/${id}`);
  }

  createDocuments(pm: Documents): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, pm);
  }

  getDocumentsById(id: string): Observable<Documents>
  {
    return this.http.get<Documents>(`${this.apiUrl}/GetDocument/${id}`);
  }

  updateDocuments(pm: Documents): Observable<boolean>
  {
    return this.http.post<boolean>(`${this.apiUrl}`, { _method: 'PUT', ...pm });
  }

  deleteDocuments(id: string): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
