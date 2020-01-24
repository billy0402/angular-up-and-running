import { Component, OnInit } from '@angular/core';

@Component({
  // 使用此元件的選擇器。注意它前綴的 app，這是 Angular CLI 依預設加入的，可以自行指定。
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
// 實作 OnInit 介面，讓元件在初始化時取得掛鉤
export class StockItemComponent implements OnInit {

  // 定義從 HTML 存取的各種欄位
  public name: string;
  public code: string;
  public price: number;
  public previousPrice: number;
  public positiveChange: boolean;
  public favorite: boolean;

  constructor() { }

  // OnInit 函式在元件初始化時觸發
  ngOnInit() {
    // 初始化每個欄位的值
    this.name = 'Test Stock Company';
    this.code = 'TSC';
    this.price = 85;
    this.previousPrice = 80;
    this.positiveChange = this.price >= this.previousPrice;
    this.favorite = false;
  }

  toggleFavorite(event) {
    console.log('We are toggling the favorite state for this stock', event);
    this.favorite = !this.favorite;
  }

}
