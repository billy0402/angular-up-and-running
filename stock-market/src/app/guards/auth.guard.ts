import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';

import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    console.log('AuthGuard#canActivate called');

    if (this.authService.isLoggedIn()) {
      return true;
    }

    console.log('AuthGuard#canActivate not authorized to access page');
    // 儲存目前路徑並重新導回
    // 儲存在服務，加入查訊參數
    this.router.navigate(['login']);

    return false;
  }

}
