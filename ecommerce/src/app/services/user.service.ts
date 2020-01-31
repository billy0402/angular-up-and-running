import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient,
              private authService: AuthService) {
  }

  login(username: string, password: string): Observable<any> {
    return this._http.post('/api/user/login', {
      username: username,
      password: password
    }).pipe(map((res: any) => {
      this.authService.token = res.token;
      return res;
    }));
  }

  register(username: string, password: string): Observable<any> {
    return this._http.post('/api/user/register', {
      username: username,
      password: password
    });
  }

}
