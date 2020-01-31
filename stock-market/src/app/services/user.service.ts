import {Inject, Injectable, Optional} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string;

  constructor(private _http: HttpClient,
              private authService: AuthService,
              @Optional() @Inject(APP_BASE_HREF) origin: string) {
    this.baseUrl = `${origin}/api/stock`;
  }

  login(username: string, password: string): Observable<any> {
    return this._http.post(`${this.baseUrl}/login`, {
      username: username,
      password: password
    }).pipe(map((res: any) => {
      this.authService.token = res.token;
      return res;
    }));
  }

  register(username: string, password: string): Observable<any> {
    return this._http.post(`${this.baseUrl}/register`, {
      username: username,
      password: password
    });
  }

}
