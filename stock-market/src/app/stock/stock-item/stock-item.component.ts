import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Stock} from '../../model/stock'

@Component({
  // 使用此元件的選擇器。注意它前綴的 app，這是 Angular CLI 依預設加入的，可以自行指定。
  selector: 'app-stock-item', // <- <app-stock-item></app-stock-item>
  // 模板
  templateUrl: './stock-item.component.html', // 相對路徑
  // 樣式
  styleUrls: ['./stock-item.component.css'],
  // 根據此元件的 Input 決定是否要檢查
  changeDetection: ChangeDetectionStrategy.OnPush
})
// 實作 OnInit 介面，讓元件在初始化時取得掛鉤
export class StockItemComponent implements OnInit {

  @Input() public stock: Stock;
  @Output() private toggleFavorite: EventEmitter<Stock>;

  constructor() {
    this.toggleFavorite = new EventEmitter<Stock>();
  }

  // OnInit 函式在元件初始化時觸發
  ngOnInit() {
  }

  getPriceClass() {
    let diff = (this.stock.price / this.stock.previousPrice) - 1;
    let largeChange = Math.abs(diff) > 0.01;
    return {
      'positive': this.stock.isPositiveChange(),
      'negative': !this.stock.isPositiveChange(),
      'large-change': largeChange,
      'small-change': !largeChange
    };
  }

  onToggleFavorite(event) {
    console.log('We are toggling the favorite state for this stock', event);
    this.toggleFavorite.emit(this.stock);
  }

  changeStockPrice() {
    this.stock.price += 5;
  }

}
