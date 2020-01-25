import {Component, OnInit} from '@angular/core';

import {Stock} from './model/stock';

@Component({
  // 此 DOM 的 CSS 選擇器會被轉譯成此元件的一個實例
  selector: 'app-root',
  // 此元件專屬的 HTML 模板
  templateUrl: './app.component.html',
  // 此元件專屬的樣式表
  styleUrls: ['./app.component.css']
})
// 元件類別與成員和函式
export class AppComponent {

  title = 'stock-market';

  public stockObj: Stock;

  ngOnInit(): void {
    // 初始化每個欄位的值
    this.stockObj = new Stock('Test Stock Company', 'TSC', 85, 80);
  }

  onToggleFavorite(stock: Stock) {
    console.log(`Favorite for stock ${stock.name} was triggered.`);
    stock.favorite = !stock.favorite;
  }

}
