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

  public stockObjs: Array<Stock>;

  ngOnInit(): void {
    // 初始化每個欄位的值
    this.stockObjs = [
      new Stock('Test Stock Company', 'TSC', 85, 80),
      new Stock('Second Stock Company', 'SSC', 10, 20),
      new Stock('Last Stock Company', 'LSC', 876, 765)
    ];
  }

  onToggleFavorite(stock: Stock) {
    console.log(`Favorite for stock ${stock.name} was triggered.`);
    stock.favorite = !stock.favorite;
  }

}
