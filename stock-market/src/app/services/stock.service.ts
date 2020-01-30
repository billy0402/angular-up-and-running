import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// 從 rxjs 匯入 Observable. Observable API 核心方法 (例如throw 與 of)
import {Observable} from 'rxjs';

import {Stock} from '../model/stock';

@Injectable()
export class StockService {

  constructor(private _http: HttpClient) {
  }

  // 將 getStocks 回傳型別改為可觀察
  getStocks(query: string): Observable<Stock[]> {
    return this._http.get<Stock[]>(`/api/stock?q=${query}`);
  }

  getStock(code: string) {
    return this._http.get<Stock>(`/api/stock/${code}`);
  }

  createStock(stock: Stock): Observable<any> {
    return this._http.post('/api/stock', stock);
  }

  toggleFavorite(stock: Stock): Observable<Stock> {
    return this._http.patch<Stock>(`/api/stock/${stock.code}`, {
      favorite: !stock.favorite
    });
  }

  makeFailingCall() {
    return this._http.get('/api/fail');
  }

}
