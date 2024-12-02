import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bidder } from '../models/bidder.model';

@Injectable({
  providedIn: 'root'
})
export class BidderService {
  private apiUrl = 'https://localhost:7002/api/bidders';

  constructor(private http: HttpClient) { }

  getBidders(): Observable<Bidder[]>
  {
    return this.http.get<Bidder[]>(this.apiUrl);
  }

  createBidder(bidder: Bidder): Observable<boolean>
  {
    return this.http.post<boolean>(this.apiUrl, bidder);
  }

  getBidderById(id: number): Observable<Bidder>
  {
    return this.http.get<Bidder>(`${this.apiUrl}/${id}`);
  }

  updateBidder(bidder: Bidder): Observable<boolean>
  {
    return this.http.post<boolean>(`${this.apiUrl}`, { _method: 'PUT', ...bidder });
  }

  deleteBidder(id: number): Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
