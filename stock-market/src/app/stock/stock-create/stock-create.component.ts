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
    this.stock = new Stock('', '', 0, 0, 'NASDAQ');
  }

  createStock(stockForm) {
    console.log('Stock From', stockForm.value);
    if (stockForm.valid) {
      this.stock = stockForm.value.stock;
      console.log('Creating stock ', this.stock);
    } else {
      console.error('Stock form is in an invalid state');
    }
  }

}
