import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shippings } from '../models/shippings.model';

@Injectable({
  providedIn: 'root'
})
export class ShippingsService {
  private apiUrl = 'https://localhost:7002/api/Shippings';

  constructor(private http: HttpClient) { }

  getShippings(type: string): Observable<Shippings[]>
  {
    return this.http.get<Shippings[]>(`${this.apiUrl}/${type}`);
  }

  createShippings(Shippings: Shippings): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, Shippings);
  }

  getShippingsById(id: number): Observable<Shippings>
  {
    return this.http.get<Shippings>(`${this.apiUrl}/GetById/${id}`);
  }

  updateShippings(Shippings: Shippings): Observable<boolean>
  {
    return this.http.post<boolean>(`${this.apiUrl}`, { _method: 'PUT', ...Shippings });
  }

  deleteShippings(id: number): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
