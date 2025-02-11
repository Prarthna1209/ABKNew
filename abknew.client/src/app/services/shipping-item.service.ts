import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShippingItem } from '../models/shipping-item.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShippingItemService
{
  private apiUrl = `${environment.apiUrl}ShippingItems`;

  constructor(private http: HttpClient) { }

  getShippingItems(): Observable<ShippingItem[]>
  {
    return this.http.get<ShippingItem[]>(this.apiUrl);
  }

  createShippingItem(shippingItem: ShippingItem): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, shippingItem);
  }

  getShippingItemById(id: string): Observable<ShippingItem>
  {
    return this.http.get<ShippingItem>(`${this.apiUrl}/${id}`);
  }

  updateShippingItem(shippingItem: ShippingItem): Observable<boolean>
  {
    return this.http.post<boolean>(`${this.apiUrl}`, { _method: 'PUT', ...shippingItem });
  }

  deleteShippingItem(id: string): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
