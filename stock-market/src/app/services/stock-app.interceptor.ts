import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {AuthService} from './auth.service';

@Injectable()
// 實作 HttpInterceptor 介面
export class StockAppInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  // 實作 intercept API
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`Making a request to ${req.url}`);

    // 檢查伺服器中的認證憑證
    if (this.authService.token) {
      console.log(`Interceptor has token ${this.authService.token}`);
      const authRequest = req.clone({
        headers: req.headers.set('X-AUTH-HEADER', this.authService.token)
      });
      console.log('Making an authorized request');
      // 以額外的標頭改變請求為有認證的請求
      req = authRequest;
    }

    // 以請求呼叫 handle 以繼續鏈接
    return next.handle(req);
  }

  // 處理成功回應
  handleResponse(req: HttpRequest<any>, event: any) {
    console.log(`Handling response for ${req.url}`, event);

    if (event instanceof HttpResponse) {
      console.log(`Request for ${req.url} Response Status ${event.status} With body`, event.body);
    }
  }

  // 處理錯誤回應
  handleError(req: HttpRequest<any>, event: any) {
    console.error(`Request for ${req.url} Response Status ${event.status} With error`, event.error);
  }

}
