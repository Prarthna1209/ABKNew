import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manufecturers } from '../models/manufecturers.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManufecturersService
{
  private apiUrl = `${environment.apiUrl}Manufacturers`;

  constructor(private http: HttpClient) { }

  getManufacturer(): Observable<Manufecturers[]>
  {
    return this.http.get<Manufecturers[]>(this.apiUrl);
  }

  createManufacturer(manufecturer: Manufecturers): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, manufecturer);
  }

  getManufacturerById(id: string): Observable<Manufecturers>
  {
    return this.http.get<Manufecturers>(`${this.apiUrl}/${id}`);
  }

  getProductCount(id: string): Observable<Manufecturers>
  {
    return this.http.get<Manufecturers>(`${this.apiUrl}/GetProductCount/${id}`);
  }

  updateManufacturer(manufecturer: Manufecturers): Observable<boolean>
  {
    return this.http.post<boolean>(`${this.apiUrl}`, { _method: 'PUT', ...manufecturer });
  }

  deleteManufacturer(id: string): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
