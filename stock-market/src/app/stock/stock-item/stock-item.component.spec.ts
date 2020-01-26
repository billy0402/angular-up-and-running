// 匯入 Angular 測試工具
import {async, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {StockItemComponent} from './stock-item.component';
import {Stock} from '../../model/stock';

describe('Stock Item Component', () => {
  let fixture, component;

  // 非同步的 beforeEach，確保模板載入元件中
  beforeEach(async(() => {
    // 使用 Angular 的測試工具設定測試模組
    TestBed.configureTestingModule({
      declarations: [
        StockItemComponent
      ],
      // 編譯所有宣吿的元件供後續使用
    }).compileComponents();
  }));

  // 非非同步的 beforeEach，只在前一個完成後執行
  beforeEach(() => {
    // 建構測試嚇得元件實例
    fixture = TestBed.createComponent(StockItemComponent);
    // 取得測試元件實例
    component = fixture.componentInstance;
    component.stock = new Stock('Testing Stock', 'TS', 100, 200, 'NASDAQ');
    // 手動觸發 Angular 的變更檢測以更新模板
    fixture.detectChanges();
  });

  it('should create stock component and render stock data', () => {
    // 從編譯後的元素取得特定 HTML 元素
    const nameEl = fixture.debugElement.query(By.css('.name'));
    // 檢查元素是否為預期值
    expect(nameEl.nativeElement.textContent).toEqual('Testing Stock (TS)');
    const priceEl = fixture.debugElement.query(By.css('.price.negative'));
    expect(priceEl.nativeElement.textContent).toEqual('$ 100');
    const addToFavoriteBtnEl = fixture.debugElement.query(By.css('button'));
    expect(addToFavoriteBtnEl).toBeDefined();
  });

  it('should trigger event emitter on add to favorite', () => {
    let selectedStock: Stock;
    component.toggleFavorite.subscribe((stock: Stock) => selectedStock = stock);
    const addToFavoriteBtnEl = fixture.debugElement.query(By.css('button'));

    expect(selectedStock).toBeUndefined();
    addToFavoriteBtnEl.triggerEventHandler('click', null);
    expect(selectedStock).toEqual(component.stock);
  });
});
