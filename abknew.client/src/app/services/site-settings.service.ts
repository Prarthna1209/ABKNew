import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SiteSettings } from '../models/site-settings.model';

@Injectable({
  providedIn: 'root'
})
export class SiteSettingsService {
  private apiUrl = 'https://localhost:7002/api/settings';

  constructor(private http: HttpClient) { }

  getSiteSettingss(): Observable<SiteSettings[]>
  {
    return this.http.get<SiteSettings[]>(this.apiUrl);
  }

  createSiteSettings(user: SiteSettings): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, user);
  }

  getSiteSettingsById(id: string): Observable<SiteSettings>
  {
    return this.http.get<SiteSettings>(`${this.apiUrl}/${id}`);
  }

  updateSiteSettings(id: string, user: SiteSettings): Observable<SiteSettings>
  {
    return this.http.put<SiteSettings>(`${this.apiUrl}/${id}`, user);
  }

  deleteSiteSettings(id: string): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
