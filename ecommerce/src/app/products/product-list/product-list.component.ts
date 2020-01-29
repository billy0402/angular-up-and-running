import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {Product} from '../../model/product';
import {ProductQuantityChange} from '../../model/productQuantityChange';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  template: `
    <div class="product-list">
      <app-product-item *ngFor="let product of products$ | async;"
                        [product]="product"
                        (quantityChange)="onQuantityChange($event)"></app-product-item>
    </div>
  `,
  styles: []
})
export class ProductListComponent implements OnInit {

  public products$: Observable<Product[]>;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.products$ = this.productService.getProducts();
  }

  onQuantityChange(change: ProductQuantityChange) {
    this.productService.onQuantityChange(change.product, change.changeInQuantity);
  }

}
