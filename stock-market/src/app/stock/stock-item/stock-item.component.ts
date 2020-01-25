import { Component, OnInit } from '@angular/core';

import {Stock} from '../../model/stock'

@Component({
  // 使用此元件的選擇器。注意它前綴的 app，這是 Angular CLI 依預設加入的，可以自行指定。
  selector: 'app-stock-item', // <- <app-stock-item></app-stock-item>
  // 模板
  templateUrl: './stock-item.component.html', // 相對路徑
  // 樣式
  styleUrls: ['./stock-item.component.css']
})
// 實作 OnInit 介面，讓元件在初始化時取得掛鉤
export class StockItemComponent implements OnInit {

  public stocks: Array<Stock>;

  constructor() { }

  // OnInit 函式在元件初始化時觸發
  ngOnInit() {
    // 初始化每個欄位的值
    this.stocks = [
      new Stock('Test Stock Company', 'TSC', 85, 80),
      new Stock('Second Stock Company', 'SSC', 10, 20),
      new Stock('Last Stock Company', 'LSC', 876, 765)
    ];
  }

  getPriceClass(stock) {
    let diff = (stock.price / stock.previousPrice) - 1;
    let largeChange = Math.abs(diff) > 0.01;
    return {
      'positive': stock.isPositiveChange(),
      'negative': !stock.isPositiveChange(),
      'large-change': largeChange,
      'small-change': !largeChange
    }
  }

  toggleFavorite(event, index) {
    console.log('We are toggling the favorite state for this stock', event);
    let stock = this.stocks[index];
    stock.favorite = !stock.favorite;
  }

  trackStockByCode(index, stock) {
    return stock.id
  }

}
