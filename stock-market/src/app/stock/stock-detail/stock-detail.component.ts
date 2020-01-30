import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Stock} from '../../model/stock';
import {StockService} from '../../services/stock.service';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {

  public stock: Stock;

  // 將作用中的路徑注入建構元
  constructor(private stockService: StockService,
              private _route: ActivatedRoute) {
  }

  ngOnInit() {
    // 使用作用中的路徑從 URL 讀取代號
    const stockCode = this._route.snapshot.paramMap.get('code');
    this.stockService.getStock(stockCode)
      .subscribe(stock => this.stock = stock);
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

}
