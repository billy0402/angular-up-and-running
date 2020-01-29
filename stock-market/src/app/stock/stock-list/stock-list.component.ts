import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {Stock} from '../../model/stock';
import {StockService} from '../../services/stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  // 將可觀察儲存為成員變數
  public stocks$: Observable<Stock[]>;

  // 將 StockService 注入元件
  constructor(private stockService: StockService) {
  }

  ngOnInit() {
    // 使用 StockService 取得股票清單，呼叫並儲存可觀察
    this.stocks$ = this.stockService.getStocks();

    this.stockService.getStocksAsResponse()
      .subscribe((response) => {
        console.log('OBSERVE "response" is ', response);
      });

    this.stockService.getStocksAsEvents()
      .subscribe((response) => {
        console.log('OBSERVE "events" is ', response);
      });

    this.stockService.getStocksAsString()
      .subscribe((response) => {
        console.log('OBSERVE Type "text" is ', response);
      });

    this.stockService.getStocksAsBlob()
      .subscribe((response) => {
        console.log('OBSERVE Type "blob" is ', response);
      });
  }

}
