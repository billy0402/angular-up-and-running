import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {Stock} from '../model/stock';
import {StockService} from '../services/stock.service';

@Injectable({
  providedIn: 'root'
})
export class StockLoadResolverService implements Resolve<Stock> {

  constructor(private stockService: StockService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot):
    Stock | Observable<Stock> | Promise<Stock> {
    const stockCode = route.paramMap.get('code');
    return this.stockService.getStock(stockCode);
  }

}
