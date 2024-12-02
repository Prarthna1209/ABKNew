import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Specifications } from '../models/specifications.model';

@Injectable({
  providedIn: 'root'
})
export class SpecificationsService {
  private apiUrl = 'https://localhost:7002/api/specifications';

  constructor(private http: HttpClient) { }

  getSpecification(): Observable<Specifications[]>
  {
    return this.http.get<Specifications[]>(this.apiUrl);
  }

  createSpecification(specification: Specifications): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, specification);
  }

  getSpecificationById(id: number): Observable<Specifications>
  {
    return this.http.get<Specifications>(`${this.apiUrl}/${id}`);
  }

  updateSpecification(specification: Specifications): Observable<boolean>
  {
    return this.http.post<boolean>(`${this.apiUrl}`, { _method: 'PUT', ...specification });
  }

  deleteSpecification(id: number): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
