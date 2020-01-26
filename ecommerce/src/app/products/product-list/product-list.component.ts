import {Component, OnInit} from '@angular/core';

import {Product} from '../../model/product';
import {ProductQuantityChange} from '../../model/productQuantityChange';

@Component({
  selector: 'app-product-list',
  template: `
    <div class="product-list">
      <app-product-item *ngFor="let product of products"
                        [product]="product"
                        (quantityChange)="onQuantityChange($event)"></app-product-item>
    </div>
  `,
  styles: []
})
export class ProductListComponent implements OnInit {

  public products: Array<Product>;

  constructor() {
    this.products = [
      new Product(
        1,
        'MacBook Air (Retina)',
        36900,
        'compare_macbook_air_retina_spacegray__era7vec2t6qa_large_2x',
      ),
      new Product(
        2,
        'MacBook Pro 13 吋',
        42900,
        'compare_macbook_pro_13_spacegray__jy60myikwne6_large_2x',
      ),
      new Product(
        3,
        'MacBook Pro 16 吋',
        77900,
        'compare_macbook_pro_16_spacegray__dx8anpw8a9qq_large_2x',
        true
      )
    ];
  }

  ngOnInit() {
  }

  onQuantityChange(change: ProductQuantityChange) {
    const product = this.products.find(product =>
      change.product.id === product.id
    );
    product.quantityInCart += change.changeInQuantity;
  }

}
