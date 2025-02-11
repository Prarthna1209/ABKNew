import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRoles } from '../models/user-roles.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService
{
  private apiUrl = `${environment.apiUrl}userroles`;

  constructor(private http: HttpClient) { }

  getUserRoles(): Observable<UserRoles[]>
  {
    return this.http.get<UserRoles[]>(this.apiUrl);
  }

  createUserRoles(user: UserRoles): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, user);
  }

  getUserRolesById(id: string): Observable<UserRoles>
  {
    return this.http.get<UserRoles>(`${this.apiUrl}/${id}`);
  }


  updateUserRoles(id: string, user: UserRoles): Observable<UserRoles>
  {
    return this.http.put<UserRoles>(`${this.apiUrl}/${id}`, user);
  }

  deleteUserRoles(id: string): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
