import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Engineers } from '../models/engineers.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EngineersService
{
  private apiUrl = `${environment.apiUrl}engineers`;

  constructor(private http: HttpClient) { }

  getEngineers(): Observable<Engineers[]>
  {
    return this.http.get<Engineers[]>(this.apiUrl);
  }

  createEngineer(engineer: Engineers): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, engineer);
  }

  getEngineerById(id: string): Observable<Engineers>
  {
    return this.http.get<Engineers>(`${this.apiUrl}/${id}`);
  }

  updateEngineer(engineer: Engineers): Observable<boolean>
  {
    return this.http.post<boolean>(`${this.apiUrl}`, { _method: 'PUT', ...engineer });
  }

  deleteEngineer(id: string): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
