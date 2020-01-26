import {Component, OnInit} from '@angular/core';

import {Stock} from '../../model/stock';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent {

  public stock: Stock;
  public confirmed: boolean = false;
  public exchanges: Array<string> = ['NYSE', 'NASDAQ', 'OTHER'];

  constructor() {
    this.stock = new Stock('test', '', 0, 0, 'NASDAQ');
  }

  setStockPrice(price) {
    this.stock.price = price;
    this.stock.previousPrice = price;
  }

  createStock() {
    console.log(`Creating stock ${this.stock}`);
  }

}
