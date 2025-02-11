import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bidder } from '../models/bidder.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BidderService {
  private apiUrl = `${environment.apiUrl}bidders`;

  constructor(private http: HttpClient) { }

  getBidders(): Observable<Bidder[]>
  {
    return this.http.get<Bidder[]>(this.apiUrl);
  }

  createBidder(bidder: Bidder): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, bidder);
  }

  getBidderById(id: string): Observable<Bidder>
  {
    return this.http.get<Bidder>(`${this.apiUrl}/${id}`);
  }

  updateBidder(bidder: Bidder): Observable<boolean>
  {
    return this.http.post<boolean>(`${this.apiUrl}`, { _method: 'PUT', ...bidder });
  }

  deleteBidder(id: string): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
