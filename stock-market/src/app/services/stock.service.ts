import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';
// 從 rxjs 匯入 Observable. Observable API 核心方法 (例如throw 與 of)
import {Observable} from 'rxjs';

import {Stock} from '../model/stock';

@Injectable()
export class StockService {

  constructor(private _http: HttpClient) {
  }

  // 將 getStocks 回傳型別改為可觀察
  getStocks(): Observable<Stock[]> {
    return this._http.get<Stock[]>('/api/stock', {
      // 對發出的呼叫加上 HTTP 表頭
      headers: new HttpHeaders()
        .set('Authorization', 'MyAuthorizationHeaderValue')
        .set('X-EXAMPLE-HEADER', 'TestValue'),
      // 對發出的呼叫加上查詢參數
      params: {
        q: 'test',
        test: 'value'
      },
      // 只觀察回應內容
      observe: 'body'
    });
  }

  getStocksAsResponse(): Observable<HttpResponse<Stock[]>> {
    return this._http.get<Stock[]>('/api/stock', {
      // 觀察整個回應
      observe: 'response'
    });
  }

  getStocksAsEvents(): Observable<HttpEvent<any>> {
    return this._http.get('/api/stock', {
      // 觀察所有事件
      observe: 'events'
    });
  }

  getStocksAsString(): Observable<string> {
    return this._http.get('/api/stock', {
      // 回應視為文字
      responseType: 'text'
    });
  }

  getStocksAsBlob(): Observable<Blob> {
    return this._http.get('/api/stock', {
      // 回應視為 blob
      responseType: 'blob'
    });
  }

  createStock(stock: Stock): Observable<any> {
    return this._http.post('/api/stock', stock);
  }

  toggleFavorite(stock: Stock): Observable<Stock> {
    return this._http.patch<Stock>(`/api/stock/${stock.code}`, {
      favorite: !stock.favorite
    });
  }

}
