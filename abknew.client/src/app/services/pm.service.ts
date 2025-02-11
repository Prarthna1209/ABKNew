import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pm } from '../models/pm.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PmService
{
  private apiUrl = `${environment.apiUrl}pm`;

  constructor(private http: HttpClient) { }

  getPM(): Observable<Pm[]>
  {
    return this.http.get<Pm[]>(this.apiUrl);
  }

  createPM(pm: Pm): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, pm);
  }

  getPMById(id: string): Observable<Pm>
  {
    return this.http.get<Pm>(`${this.apiUrl}/${id}`);
  }

  updatePM(pm: Pm): Observable<boolean>
  {
    return this.http.post<boolean>(`${this.apiUrl}`, { _method: 'PUT', ...pm });
  }

  deletePM(id: string): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
