import {Component, OnInit} from '@angular/core';

import {Stock} from '../../model/stock';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent {

  public stock: Stock;

  constructor() {
    this.stock = new Stock('test', '', 0, 0);
  }

}
