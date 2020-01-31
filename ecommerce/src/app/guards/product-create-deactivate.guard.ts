import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {ProductCreateComponent} from '../products/product-create/product-create.component';

@Injectable({
  providedIn: 'root'
})
export class ProductCreateDeactivateGuard implements CanDeactivate<ProductCreateComponent> {

  constructor() {
  }

  canDeactivate(component: ProductCreateComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot):
    boolean | Observable<boolean> | Promise<boolean> {
    return window.confirm('Do you want to navigate away from this page?');
  }

}
