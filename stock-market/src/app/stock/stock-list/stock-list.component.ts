import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, share, startWith, switchMap} from "rxjs/operators";

import {Stock} from '../../model/stock';
import {StockService} from '../../services/stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  // 將可觀察儲存為成員變數
  public stocks$: Observable<Stock[]>;
  public searchString: string = '';
  private searchTerms: Subject<string> = new Subject();

  // 將 StockService 注入元件
  constructor(private stockService: StockService) {
  }

  ngOnInit() {
    this.stocks$ = this.searchTerms.pipe(
      startWith(this.searchString),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(query => this.stockService.getStocks(query)),
      share()
    );
  }

  search() {
    this.searchTerms.next(this.searchString);
  }

}
