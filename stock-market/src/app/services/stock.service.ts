import {Inject, Injectable, Optional} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClient} from '@angular/common/http';
// 從 rxjs 匯入 Observable. Observable API 核心方法 (例如throw 與 of)
import {Observable} from 'rxjs';

import {Stock} from '../model/stock';

@Injectable()
export class StockService {

  private baseUrl: string;

  constructor(private _http: HttpClient,
              @Optional() @Inject(APP_BASE_HREF) origin: string) {
    this.baseUrl = `${origin}/api/stock`;
  }

  // 將 getStocks 回傳型別改為可觀察
  getStocks(query: string): Observable<Stock[]> {
    return this._http.get<Stock[]>(`${this.baseUrl}?q=${query}`);
  }

  getStock(code: string) {
    return this._http.get<Stock>(`${this.baseUrl}/${code}`);
  }

  createStock(stock: Stock): Observable<any> {
    return this._http.post(this.baseUrl, stock);
  }

  toggleFavorite(stock: Stock): Observable<Stock> {
    return this._http.patch<Stock>(`${this.baseUrl}/${stock.code}`, {
      favorite: !stock.favorite
    });
  }

  makeFailingCall() {
    return this._http.get('/api/fail');
  }

}
