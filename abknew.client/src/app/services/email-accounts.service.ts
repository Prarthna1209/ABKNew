import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailAccounts } from '../models/email-accounts.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailAccountsService {
  private apiUrl = `${environment.apiUrl}emailaccounts`;

  constructor(private http: HttpClient) { }

  getEmailAccounts(): Observable<EmailAccounts[]>
  {
    return this.http.get<EmailAccounts[]>(this.apiUrl);
  }

  createEmailAccountss(EmailAccounts: EmailAccounts): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, EmailAccounts);
  }

  getEmailAccountssById(id: string): Observable<EmailAccounts>
  {
    return this.http.get<EmailAccounts>(`${this.apiUrl}/${id}`);
  }

  updateEmailAccounts(EmailAccounts: EmailAccounts): Observable<boolean>
  {
    return this.http.post<boolean>(`${this.apiUrl}`, { _method: 'PUT', ...EmailAccounts });
  }

  deleteEmailAccountss(id: string): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
