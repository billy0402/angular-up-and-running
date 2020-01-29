import {Injectable} from '@angular/core';
// 從 rxjs 匯入 Observable. Observable API 核心方法 (例如throw 與 of)
import {Observable, throwError as ObservableThrow, of as ObservableOf} from 'rxjs';

import {Stock} from '../model/stock';

@Injectable()
export class StockService {

  private stocks: Stock[];

  constructor() {
    this.stocks = [
      new Stock('Test Stock Company', 'TSC', 85, 80, 'NASDAQ'),
      new Stock('Second Stock Company', 'SSC', 10, 20, 'NYSE'),
      new Stock('Last Stock Company', 'LSC', 876, 765, 'NYSE')
    ];
  }

  // 將 getStocks 回傳型別改為可觀察
  getStocks(): Observable<Stock[]> {
    // 以假資料回傳可觀察
    return ObservableOf(this.stocks);
  }

  foundStock(stock: Stock) {
    return this.stocks.find(each => each.code === stock.code);
  }

  createStock(stock: Stock): Observable<any> {
    let foundStock = this.foundStock(stock);
    if (foundStock) {
      // 向觀察者拋出例外
      return ObservableThrow({msg: `Stock with code ${stock.code} already exists.`})
    }

    this.stocks.push(stock);
    return ObservableOf({msg: `Stock with code ${stock.code} successfully created.`});
  }

  toggleFavorite(stock: Stock): Observable<Stock> {
    let foundStock = this.foundStock(stock);
    foundStock.favorite = !foundStock.favorite;

    return ObservableOf(foundStock);
  }

}
