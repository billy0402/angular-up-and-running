import {Component, OnInit} from '@angular/core';

import {Product} from '../../model/product';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {

  public product: Product;
  public message: string = '';

  constructor() {
    this.product = new Product(1, 'Test', 0, '');
  }

  createProduct(productFrom) {
    if (productFrom.invalid) {
      console.error('Product form is in an invalid state');
      this.message = 'Please correct all errors and resubmit the form';
      return;
    }

    console.log('Product From', productFrom.value);
    this.product = productFrom.value.product;
    console.log('Create product', this.product);
  }

}
