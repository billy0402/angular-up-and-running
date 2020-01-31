import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {AuthService} from './auth.service';

@Injectable()
export class ProductAppInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`Making a request to ${req.url}`);

    if (this.authService.token) {
      console.log(`Interceptor has token ${this.authService.token}`);
      const authRequest = req.clone({
        headers: req.headers.set('X-AUTH-HEADER', this.authService.token)
      });
      console.log('Making an authorized request');
      req = authRequest;
    }

    return next.handle(req);
  }

}
