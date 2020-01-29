import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StockListComponent} from './stock-list.component';
import {StockItemComponent} from '../stock-item/stock-item.component';
import {StockService} from '../../services/stock.service';
import {Stock} from '../../model/stock';

describe('StockListComponent With Real Service', () => {
  let component: StockListComponent;
  let fixture: ComponentFixture<StockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StockListComponent, StockItemComponent],
      providers: [StockService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load stocks from real service on init', () => {
    expect(component).toBeTruthy();
    // 確保元件中的股票從服務載入
    expect(component.stocks.length).toEqual(3);
  });
});

describe('StockListComponent With Mock Service', () => {
  let component: StockListComponent;
  let fixture: ComponentFixture<StockListComponent>;
  let stockService: StockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StockListComponent, StockItemComponent],
      providers: [StockService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockListComponent);
    component = fixture.componentInstance;
    // 總是透過元件的注入程序取得 StockService 服務
    stockService = fixture.debugElement.injector.get(StockService);
    // 模擬 getStocks 呼叫並回傳寫死的值
    let spy = spyOn(stockService, 'getStocks')
      .and.returnValue([
        new Stock('Mock Stock', 'MS', 800, 900, 'NYSE')
      ]);
    fixture.detectChanges();
  });

  it('should load stocks from mocked service on init', () => {
    expect(component).toBeTruthy();
    // 確保元件中的股票來自模擬呼叫
    expect(component.stocks.length).toEqual(1);
    expect(component.stocks[0].code).toEqual('MS');
  });
});

describe('StockListComponent With Fake Service', () => {
  let component: StockListComponent;
  let fixture: ComponentFixture<StockListComponent>;

  beforeEach(async(() => {
    // 定義實作 getStocks() 方法的 stockServiceFake 物件
    let stockServiceFake = {
      getStocks: () => {
        return [
          new Stock('Fake Stock', 'FS', 800, 900, 'NYSE')
        ];
      }
    };
    TestBed.configureTestingModule({
      declarations: [StockListComponent, StockItemComponent],
      providers: [
        {
          provide: StockService,
          // 指定 StockService 的實例
          useValue: stockServiceFake
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load stocks from fake service on init', () => {
    expect(component).toBeTruthy();
    expect(component.stocks.length).toEqual(1);
    // 確保元件中的股票來自假的呼叫
    expect(component.stocks[0].code).toEqual('FS');
  });
});
