import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contractors } from '../models/contractors.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ContractorsService
{
  private apiUrl = `${environment.apiUrl}contractors`;

  constructor(private http: HttpClient) { }

  getContractor(): Observable<Contractors[]>
  {
    return this.http.get<Contractors[]>(this.apiUrl);
  }

  createContractor(contractor: Contractors): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, contractor);
  }

  getContractorById(id: string): Observable<Contractors>
  {
    return this.http.get<Contractors>(`${this.apiUrl}/${id}`);
  }

  updateContractor(contractor: Contractors): Observable<boolean>
  {
    return this.http.post<boolean>(`${this.apiUrl}`, { _method: 'PUT', ...contractor });
  }

  deleteContractor(id: string): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
