import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Product} from '../../model/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {

  public product: Product;

  constructor(private _route: ActivatedRoute) {
  }

  ngOnInit() {
    this._route.data.subscribe((data: { product: Product }) => {
      this.product = data.product;
    });
  }

}
