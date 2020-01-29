import {Component, Input, OnInit} from '@angular/core';

import {Stock} from '../../model/stock'
import {StockService} from '../../services/stock.service';

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

  // 只有輸入，刪除輸出連結
  @Input() public stock: Stock;

  // 在建構元注入 StockService
  constructor(private stockService: StockService) {
  }

  // OnInit 函式在元件初始化時觸發
  ngOnInit(): void {
  }

  getPriceClass() {
    let isPositiveChange = this.stock.price >= this.stock.previousPrice;
    let diff = (this.stock.price / this.stock.previousPrice) - 1;
    let largeChange = Math.abs(diff) > 0.01;
    return {
      'positive': isPositiveChange,
      'negative': !isPositiveChange,
      'large-change': largeChange,
      'small-change': !largeChange
    };
  }

  onToggleFavorite(event) {
    // onToggleFavorite 改為呼叫服務
    this.stockService.toggleFavorite(this.stock)
      .subscribe((stock) => this.stock.favorite = !this.stock.favorite);
  }

}
