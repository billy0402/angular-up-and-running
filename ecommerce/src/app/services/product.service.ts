import {Injectable} from '@angular/core';
import {Observable, throwError as ObservableThrow, of as ObservableOf} from 'rxjs';

import {Product} from "../model/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public products: Product[];

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

  getProducts(): Observable<Product[]> {
    return ObservableOf(this.products);
  }

  foundProduct(product: Product): Product {
    return this.products.find(each => each.id === product.id);
  }

  createProduct(product: Product): Observable<any> {
    let productClone = {...product};
    productClone.id = this.products.length + 1;
    productClone.quantityInCart = 0;

    this.products.push(productClone);
    return ObservableOf(productClone);
  }

  onQuantityChange(product: Product, changeInQuantity: number): Observable<Product> {
    const foundProduct = this.foundProduct(product);
    foundProduct.quantityInCart += changeInQuantity;

    return ObservableOf(foundProduct);
  }

}
