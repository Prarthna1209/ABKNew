import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/products.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService
{
  private apiUrl = `${environment.apiUrl}products`;

  constructor(private http: HttpClient) { }

  getProduct(id:string): Observable<Product[]>
  {
    return this.http.get<Product[]>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, product);
  }

  getProductById(id: string): Observable<Product>
  {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  updateProduct(product: Product): Observable<boolean>
  {
    return this.http.post<boolean>(`${this.apiUrl}`, { _method: 'PUT', ...product });
  }

  deleteProduct(id: string): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
