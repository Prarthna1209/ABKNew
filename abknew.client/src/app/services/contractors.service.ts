import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contractors } from '../models/contractors.model';

@Injectable({
  providedIn: 'root'
})
export class ContractorsService {
  private apiUrl = 'https://localhost:7002/api/contractors';

  constructor(private http: HttpClient) { }

  getContractor(): Observable<Contractors[]>
  {
    return this.http.get<Contractors[]>(this.apiUrl);
  }

  createContractor(contractor: Contractors): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, contractor);
  }

  getContractorById(id: number): Observable<Contractors>
  {
    return this.http.get<Contractors>(`${this.apiUrl}/${id}`);
  }

  updateContractor(contractor: Contractors): Observable<boolean>
  {
    return this.http.post<boolean>(`${this.apiUrl}`, { _method: 'PUT', ...contractor });
  }

  deleteContractor(id: number): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
