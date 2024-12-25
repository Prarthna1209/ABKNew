import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pdni } from '../models/pdni.model';

@Injectable({
  providedIn: 'root'
})
export class PdniService {
  private apiUrl = 'https://localhost:7002/api/pdni';

  constructor(private http: HttpClient) { }

  getPdni(): Observable<Pdni[]>
  {
    return this.http.get<Pdni[]>(this.apiUrl);
  }

  createPdni(pdni: Pdni): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, pdni);
  }

  getPdniById(id: string): Observable<Pdni>
  {
    return this.http.get<Pdni>(`${this.apiUrl}/${id}`);
  }

  updatePdni(pdni: Pdni): Observable<boolean>
  {
    return this.http.post<boolean>(`${this.apiUrl}`, { _method: 'PUT', ...pdni });
  }

  deletePdni(id: string): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
