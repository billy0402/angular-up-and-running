import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {By} from '@angular/platform-browser';

import {StockListComponent} from './stock-list.component';
import {StockItemComponent} from '../stock-item/stock-item.component';
import {StockService} from '../../services/stock.service';
import {Stock} from '../../model/stock';

describe('StockListComponent With Real Service', () => {
  let component: StockListComponent;
  let fixture: ComponentFixture<StockListComponent>;
  let httpBackend: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StockListComponent, StockItemComponent],
      providers: [StockService],
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    httpBackend = backend;
    fixture = TestBed.createComponent(StockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // 設定 /api/stock 呼叫作為測試的一部分
    httpBackend.expectOne({
      url: '/api/stock',
      method: 'GET'
      //  定義呼叫 GET 時回傳的股票清單
    }, 'Get list of stocks')
      .flush([
        {
          name: 'Test Stock 1',
          code: 'TS1',
          price: 80,
          previousPrice: 90,
          exchange: 'NYSE'
        },
        {
          name: 'Test Stock 2',
          code: 'TS2',
          price: 800,
          previousPrice: 900,
          exchange: 'NYSE'
        }
      ]);
  }));

  it('should load stocks from real service on init', async(() => {
    expect(component).toBeTruthy();
    // 確保元件中的股票從服務載入
    expect(component.stocks$).toBeTruthy();

    // 等待 Angular 工作佇列清空然後繼續
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const stockItems = fixture.debugElement.queryAll(By.css('app-stock-item'));
      expect(stockItems.length).toEqual(2);
    });
  }));

  afterEach(() => {
    // 檢驗 /api/stock 的 GET 呼叫確實是測試的一部分
    httpBackend.verify();
  });
});

// describe('StockListComponent With Mock Service', () => {
//   let component: StockListComponent;
//   let fixture: ComponentFixture<StockListComponent>;
//   let stockService: StockService;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [StockListComponent, StockItemComponent],
//       providers: [StockService]
//     })
//       .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(StockListComponent);
//     component = fixture.componentInstance;
//     // 總是透過元件的注入程序取得 StockService 服務
//     stockService = fixture.debugElement.injector.get(StockService);
//     // 模擬 getStocks 呼叫並回傳寫死的值
//     let spy = spyOn(stockService, 'getStocks')
//       .and.returnValue([
//         new Stock('Mock Stock', 'MS', 800, 900, 'NYSE')
//       ]);
//     fixture.detectChanges();
//   });
//
//   it('should load stocks from mocked service on init', () => {
//     expect(component).toBeTruthy();
//     // 確保元件中的股票來自模擬呼叫
//     expect(component.stocks.length).toEqual(1);
//     expect(component.stocks[0].code).toEqual('MS');
//   });
// });
//
// describe('StockListComponent With Fake Service', () => {
//   let component: StockListComponent;
//   let fixture: ComponentFixture<StockListComponent>;
//
//   beforeEach(async(() => {
//     // 定義實作 getStocks() 方法的 stockServiceFake 物件
//     let stockServiceFake = {
//       getStocks: () => {
//         return [
//           new Stock('Fake Stock', 'FS', 800, 900, 'NYSE')
//         ];
//       }
//     };
//     TestBed.configureTestingModule({
//       declarations: [StockListComponent, StockItemComponent],
//       providers: [
//         {
//           provide: StockService,
//           // 指定 StockService 的實例
//           useValue: stockServiceFake
//         }
//       ]
//     })
//       .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(StockListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should load stocks from fake service on init', () => {
//     expect(component).toBeTruthy();
//     expect(component.stocks.length).toEqual(1);
//     // 確保元件中的股票來自假的呼叫
//     expect(component.stocks[0].code).toEqual('FS');
//   });
// });
