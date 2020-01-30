import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";

import {Product} from "../model/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public products: Product[];

  constructor(private _http: HttpClient) {
  }

  getProducts(query: string): Observable<Product[]> {
    return this._http.get<Product[]>('/api/product', {
      params: {
        q: query
      }
    });
  }

  createProduct(product: Product): Observable<any> {
    return this._http.post('/api/product', product);
  }

  changeQuantity(product: Product, changeInQuantity: number): Observable<Product> {
    return this._http.patch<Product>(`/api/product/${product.id}`, {
      changeInQuantity: changeInQuantity
    });
  }

}
