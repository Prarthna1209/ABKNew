import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Takeoff } from '../models/takeoffs.model';

@Injectable({
  providedIn: 'root'
})
export class TakeoffService
{
  private apiUrl = 'https://localhost:7002/api/Takeoff';

  constructor(private http: HttpClient) { }


  getTakeoff(): Observable<Takeoff[]>
  {
    return this.http.get<Takeoff[]>(this.apiUrl);
  }

  createTakeoff(Takeoff: Takeoff): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, Takeoff);
  }

  getPendingQuotes(): Observable<Takeoff[]>
  {
    return this.http.get<Takeoff[]>(`${this.apiUrl}/GetPendingQuote`);
  }

  getQuotes(): Observable<Takeoff[]>
  {
    return this.http.get<Takeoff[]>(`${this.apiUrl}/getQuotes`);
  }

  getTakeoffById(id: string): Observable<Takeoff>
  {
    return this.http.get<Takeoff>(`${this.apiUrl}/${id}`);
  }

  updateTakeoff(Takeoff: Takeoff): Observable<boolean>
  {
    return this.http.post<boolean>(`${this.apiUrl}`, { _method: 'PUT', ...Takeoff });
  }

  generateQuote(id: string): Observable<boolean>
  {
    return this.http.get<boolean>(`${this.apiUrl}/GenerateQuote/${id}`);
  }

  deleteTakeoff(id: string): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
