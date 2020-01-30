import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, share, startWith, switchMap} from 'rxjs/operators';

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
  private page: number = 1;

  // 將 StockService. 目前 ActivatedRoute .路由注入建構元
  constructor(private stockService: StockService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    // 從 snapshot 查詢參數讀取頁數
    console.log('Page No.: ', this.route.snapshot.queryParamMap.get('page'));
    // 訂閱 queryParams 的改變
    this.route.queryParams
      .subscribe((params) => {
        console.log('Page: ', params.page);

        this.stocks$ = this.searchTerms.pipe(
          startWith(this.searchString),
          debounceTime(500),
          distinctUntilChanged(),
          switchMap(query => this.stockService.getStocks(query)),
          share()
        );
      });
  }

  search() {
    this.searchTerms.next(this.searchString);
  }

  // 增加頁數並導向同一頁
  nextPage() {
    this.router.navigate([], {
      queryParams: {
        page: ++this.page
      }
    });
  }

}
