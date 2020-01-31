import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';

import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private _router: Router) {
  }

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    console.log('AuthGuard#canActivate called');

    if (this.authService.isLoggedIn()) {
      return true;
    }

    console.log('AuthGuard#canActivate not authorized to access page');
    this._router.navigate(['login']);

    return false;
  }

}
