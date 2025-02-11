import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Taxes } from '../models/taxes.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaxesService {
  private apiUrl = `${environment.apiUrl}Taxes`;

  constructor(private http: HttpClient) { }


  getTaxes(): Observable<Taxes[]>
  {
    return this.http.get<Taxes[]>(this.apiUrl);
  }

  createTaxes(Taxes: Taxes): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, Taxes);
  }

  getTaxesById(id: string): Observable<Taxes>
  {
    return this.http.get<Taxes>(`${this.apiUrl}/${id}`);
  }

  updateTaxes(Taxes: Taxes): Observable<boolean>
  {
    return this.http.post<boolean>(`${this.apiUrl}`, { _method: 'PUT', ...Taxes });
  }

  deleteTaxes(id: string): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
