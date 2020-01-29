import {inject, TestBed} from '@angular/core/testing';

import {StockService} from './stock.service';
import {Stock} from '../model/stock';

describe('StockService', () => {
  var stockService: StockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockService]
    });
  });

  // 將 StockService 注入另一個 beforeEach 並儲存以供測試存取
  beforeEach(inject([StockService], (service: StockService) => {
    stockService = service;
  }));

  it('should allow adding stocks', () => {
    // 確保從服務的三個股票開始
    expect(stockService.getStocks().length).toEqual(3);
    let newStock = new Stock('Test A New Company', 'TTT', 850, 800, 'NASDAQ');
    // 加入股票並確保它回傳 true
    expect(stockService.createStock(newStock)).toBeTruthy();
    // 檢查加入的股票是否存在
    expect(stockService.getStocks().length).toEqual(4);
    expect(stockService.getStocks()[3].code).toEqual('TTT');
  });

  it('should fetch a list of stocks', () => {
    // 確保從服務的三個股票開始
    expect(stockService.getStocks().length).toEqual(3);
    // 檢查股票以確保資料如預期
    expect(stockService.getStocks()[0].code).toEqual('TSC');
    expect(stockService.getStocks()[1].code).toEqual('SSC');
    expect(stockService.getStocks()[2].code).toEqual('LSC');
  });
});
