import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {StockCreateComponent} from '../stock/stock-create/stock-create.component';

@Injectable({
  providedIn: 'root'
})
// 為 StockCreateComponent 實作 CanDeactivate 介面
export class StockCreateDeactivateGuard implements CanDeactivate<StockCreateComponent> {

  constructor() {
  }

  canDeactivate(component: StockCreateComponent,      // StockCreateComponent 實例
                currentRoute: ActivatedRouteSnapshot, // ActivatedRoute snapshot
                currentState: RouterStateSnapshot,    // 導向狀態 snapshot
                nextState?: RouterStateSnapshot):     // 從目前狀態瀏覽的下一個狀態
    boolean | Observable<boolean> | Promise<boolean> {
    return window.confirm('Do you want to navigate away from this page?');
  }

}
