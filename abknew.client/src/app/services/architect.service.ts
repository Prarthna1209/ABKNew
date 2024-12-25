import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Architect } from '../models/architect.model';

@Injectable({
  providedIn: 'root'
})
export class ArchitectService {
  private apiUrl = 'https://localhost:7002/api/architects';

  constructor(private http: HttpClient) { }

  getArchitectss(): Observable<Architect[]>
  {
    return this.http.get<Architect[]>(this.apiUrl);
  }

  createArchitects(Architect: Architect): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, Architect);
  }

  getArchitectsById(id: string): Observable<Architect>
  {
    return this.http.get<Architect>(`${this.apiUrl}/${id}`);
  }

  updateArchitects(Architect: Architect): Observable<boolean>
  {
    return this.http.post<boolean>(`${this.apiUrl}`, { _method: 'PUT', ...Architect });
  }

  deleteArchitects(id: string): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
