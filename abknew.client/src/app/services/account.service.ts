import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import { AuthResponse } from '../models/auth-respose.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  public loginUser = (route: string, body: Login) =>
  {
    //return this.http.post<AuthResponse>(this.createCompleteRoute(route, this.envUrl.urlAddress), body);
  }
}
