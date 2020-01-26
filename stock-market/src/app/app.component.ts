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
export class AppComponent implements OnInit {

  title = 'stock-market';

  public stockObj: Stock;
  private counter: number = 1;

  ngOnInit(): void {
    // 初始化每個欄位的值
    this.stockObj = new Stock(`Test Stock Company - ${this.counter++}`, 'TSC', 85, 80, 'NASDAQ');
  }

  onToggleFavorite(stock: Stock) {
    console.log(`Favorite for stock ${stock.name} was triggered.`);
    // 這會修改股票項目元件中的值，因為他會被連結股票項目元件的事件觸發
    stock.favorite = !stock.favorite;
  }

  changeStockObject() {
    // 這會修改股票項目元件中的值，因為我們建構股票輸入的新參考
    this.stockObj = new Stock(`Test Stock Company - ${this.counter++}`, 'TSC', 85, 80, 'NASDAQ');
  }

  changeStockPrice() {
    // 這會修改股票項目元件中的值，因為它改變參考
    // 但 Angular 因 OnPush 變更檢測策略而不會檢查，不會更新視圖
    this.stockObj.price += 10;
  }

  testMethod() {
    console.log('Test method in AppComponent triggered')
  }

}
