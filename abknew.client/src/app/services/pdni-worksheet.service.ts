import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PdniWorksheet } from '../models/pdni-worksheet.model';

@Injectable({
  providedIn: 'root'
})
export class PdniWorksheetService {
  private apiUrl = 'https://localhost:7002/api/pdniWorksheet';

  constructor(private http: HttpClient) { }

  getPdniWorksheet(): Observable<PdniWorksheet[]>
  {
    return this.http.get<PdniWorksheet[]>(this.apiUrl);
  }

  createPdniWorksheet(pdni: PdniWorksheet): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, pdni);
  }

  getPdniWorksheetById(id: string): Observable<PdniWorksheet>
  {
    return this.http.get<PdniWorksheet>(`${this.apiUrl}/${id}`);
  }

  updatePdniWorksheet(pdni: PdniWorksheet): Observable<boolean>
  {
    return this.http.post<boolean>(`${this.apiUrl}`, { _method: 'PUT', ...pdni });
  }

  deletePdniWorksheet(id: string): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  deleteByWorksheetId(id: string): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/DeleteByWorksheetId/${id}`);
  }
}
