import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, merge, share, startWith, switchMap} from "rxjs/operators";

import {Product} from '../../model/product';
import {ProductQuantityChange} from '../../model/productQuantityChange';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  template: `
    <div class="product-list">
      <div>
        <input type="text"
               name="searchBox"
               [(ngModel)]="searchTerm"
               placeholder="Search Here"
               (keyup)="search()">
      </div>

      <h2>We have found {{(products$ | async)?.length}} products!</h2>

      <app-product-item *ngFor="let product of products$ | async;"
                        [product]="product"
                        (quantityChange)="onQuantityChange($event)"></app-product-item>
    </div>
  `,
  styles: []
})
export class ProductListComponent implements OnInit {

  public products$: Observable<Product[]>;
  public searchTerm: string = '';
  private searchSubject: Subject<string> = new Subject();
  private reloadProductList: Subject<void> = new Subject();

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.products$ = this.searchSubject.pipe(
      startWith(this.searchTerm),
      debounceTime(500),
      distinctUntilChanged(),
      merge(this.reloadProductList),
      switchMap(query => this.productService.getProducts(this.searchTerm)),
      share()
    );
  }

  search() {
    this.searchSubject.next(this.searchTerm);
  }

  onQuantityChange(change: ProductQuantityChange) {
    this.productService.changeQuantity(change.product, change.changeInQuantity)
      .subscribe(res => this.reloadProductList.next());
  }

  onCreate() {
    this.reloadProductList.next();
  }

}
