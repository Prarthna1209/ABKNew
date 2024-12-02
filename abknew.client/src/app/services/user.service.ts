import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService
{
  private apiUrl = 'https://localhost:7002/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>
  {
    return this.http.get<User[]>(this.apiUrl);
  }

  createUser(user: User): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, user);
  }

  getUserById(id: string): Observable<User>
  {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  getSalesPersons(): Observable<User[]>
  {
    return this.http.get<User[]>(`${this.apiUrl}/SalesPersons`);
  }

  updateUser(id: string, user: User): Observable<User>
  {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
