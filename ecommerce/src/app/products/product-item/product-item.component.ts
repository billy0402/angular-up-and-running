import {Component, OnInit} from '@angular/core';

import {Product} from '../../model/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  public product: Product;
  public quantities: Array<number>;

  constructor() {
  }

  ngOnInit() {
    this.product = new Product(
      'MacBook Pro',
      78900,
      'https://support.apple.com/library/content/dam/edam/applecare/images/en_US/macbookpro/macbook-pro-2016-15in-device.jpg',
      true
    );
    this.quantities = [...Array(21).keys()];
  }

}
