import { Component, OnInit } from '@angular/core';

import {Stock} from '../../model/stock'

@Component({
  // 使用此元件的選擇器。注意它前綴的 app，這是 Angular CLI 依預設加入的，可以自行指定。
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
// 實作 OnInit 介面，讓元件在初始化時取得掛鉤
export class StockItemComponent implements OnInit {

  public stock: Stock;
  public stockClasses;
  public stockStyles;

  constructor() { }

  // OnInit 函式在元件初始化時觸發
  ngOnInit() {
    // 初始化每個欄位的值
    this.stock = new Stock('Test Stock Company', 'TSC', 85, 80);
    let diff = (this.stock.price / this.stock.previousPrice) - 1;
    let largeChange = Math.abs(diff) > 0.01;
    this.stockClasses = {
      'positive': this.stock.isPositiveChange(),
      'negative': !this.stock.isPositiveChange(),
      'large-change': largeChange,
      'small-change': !largeChange
    };
    this.stockStyles = {
      'color': this.stock.isPositiveChange() ? 'green' : 'red',
      'font-size': largeChange ? '1.2em' : '0.8em'
    };
  }

  toggleFavorite(event) {
    console.log('We are toggling the favorite state for this stock', event);
    this.stock.favorite = !this.stock.favorite;
  }

}
