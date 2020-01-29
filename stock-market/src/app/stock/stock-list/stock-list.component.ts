import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {Stock} from '../../model/stock';
import {StockService} from '../../services/stock.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  // 將可觀察儲存為成員變數
  public stocks$: Observable<Stock[]>;

  // 將 StockService 注入元件
  constructor(private stockService: StockService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.fetchStocks();
  }

  fetchStocks() {
    // 使用 StockService 取得股票清單，呼叫並儲存可觀察
    this.stocks$ = this.stockService.getStocks();
  }

  setAuthToken() {
    this.authService.authToken = 'TESTING';
  }

  resetAuthToken() {
    this.authService.authToken = null;
  }

  makeFailingCall() {
    this.stockService.makeFailingCall().subscribe(
      res => console.log('Successfully made failing call', res),
      err => console.error('Error making failing call')
    );
  }

}
