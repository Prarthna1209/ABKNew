import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pm } from '../models/pm.model';

@Injectable({
  providedIn: 'root'
})
export class PmService {
  private apiUrl = 'https://localhost:7002/api/pm';

  constructor(private http: HttpClient) { }

  getPM(): Observable<Pm[]>
  {
    return this.http.get<Pm[]>(this.apiUrl);
  }

  createPM(pm: Pm): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, pm);
  }

  getPMById(id: number): Observable<Pm>
  {
    return this.http.get<Pm>(`${this.apiUrl}/${id}`);
  }

  updatePM(pm: Pm): Observable<boolean>
  {
    return this.http.post<boolean>(`${this.apiUrl}`, { _method: 'PUT', ...pm });
  }

  deletePM(id: number): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
