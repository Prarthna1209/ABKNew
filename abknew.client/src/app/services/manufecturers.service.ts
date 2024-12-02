import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manufecturers } from '../models/manufecturers.model';

@Injectable({
  providedIn: 'root'
})
export class ManufecturersService {
  private apiUrl = 'https://localhost:7002/api/Manufacturers';

  constructor(private http: HttpClient) { }

  getManufacturer(): Observable<Manufecturers[]>
  {
    return this.http.get<Manufecturers[]>(this.apiUrl);
  }

  createManufacturer(manufecturer: Manufecturers): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, manufecturer);
  }

  getManufacturerById(id: number): Observable<Manufecturers>
  {
    return this.http.get<Manufecturers>(`${this.apiUrl}/${id}`);
  }

  updateManufacturer(manufecturer: Manufecturers): Observable<boolean>
  {
    return this.http.post<boolean>(`${this.apiUrl}`, { _method: 'PUT', ...manufecturer });
  }

  deleteManufacturer(id: number): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
