import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {Product} from '../model/product';
import {ProductService} from '../services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductLoadResolverService implements Resolve<Product> {

  constructor(private productService: ProductService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot):
    Product | Observable<Product> | Promise<Product> {
    const productId = Number.parseInt(route.paramMap.get('id'));
    return this.productService.getProduct(productId);
  }

}
