import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailTemplates } from '../models/email-template.model';

@Injectable({
    providedIn: 'root'
  })

export class EmailTemplateServie {
    private apiUrl = 'https://localhost:7002/api/emailtemplates';

  constructor(private http: HttpClient) { }

  getEmailTemplates(): Observable<EmailTemplates[]>
  {
    return this.http.get<EmailTemplates[]>(this.apiUrl);
  }

  createEmailTemplatess(EmailTemplates: EmailTemplates): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, EmailTemplates);
  }

  getEmailTemplatessById(id: string): Observable<EmailTemplates>
  {
    return this.http.get<EmailTemplates>(`${this.apiUrl}/${id}`);
  }

  updateEmailTemplatess(EmailTemplates: EmailTemplates): Observable<boolean>
  {
    return this.http.post<boolean>(`${this.apiUrl}`, { _method: 'PUT', ...EmailTemplates });
  }

  deleteEmailTemplatess(id: string): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}