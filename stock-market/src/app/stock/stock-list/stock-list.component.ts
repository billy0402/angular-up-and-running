import {Component, OnInit} from '@angular/core';

import {Stock} from '../../model/stock';
import {StockService} from '../../services/stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  public stocks: Stock[];

  // 將 StockService 注入元件
  constructor(private stockService: StockService) {
  }

  ngOnInit() {
    // 使用 StockService 取得股票清單
    this.stocks = this.stockService.getStocks();
  }

  onToggleFavorite(stock: Stock) {
    console.log('Favorite for stock', stock, 'was triggered');
    // 使用 StockService 切換最愛狀態
    this.stockService.toggleFavorite(stock);
  }

}
