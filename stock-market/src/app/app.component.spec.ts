import {async, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

// 匯入測試相關的相依檔案
import {AppComponent} from './app.component';
import {StockItemComponent} from './stock/stock-item/stock-item.component';
import {Stock} from './model/stock';

// AppComponent 測試組
describe('AppComponent', () => {

  describe('Simple, No Angular Unit Test', () => {
    // 第一個測試，每個測試從 it 開始
    it('should have stock instantiated on ngInit', () => {
      // AppComponent 初始化
      const appComponent = new AppComponent();
      // 行為的預期或斷言
      expect(appComponent.stockObj).toBeUndefined();
      appComponent.ngOnInit();
      // 預期股票的最終狀態
      expect(appComponent.stockObj).toEqual(
        new Stock(`Test Stock Company - 1`, 'TSC', 85, 80)
      );
    });

    it('should have toggle stock favorite', () => {
      const appComponent = new AppComponent();
      appComponent.ngOnInit();
      expect(appComponent.stockObj.favorite).toBeFalsy();
      appComponent.onToggleFavorite(appComponent.stockObj);
      expect(appComponent.stockObj.favorite).toBeTruthy();
      appComponent.onToggleFavorite(appComponent.stockObj);
      expect(appComponent.stockObj.favorite).toBeFalsy();
    });
  });

  describe('Angular-Aware test', () => {
    let fixture, component;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          AppComponent,
          StockItemComponent,
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should load stock with default values', () => {
      const titleEl = fixture.debugElement.query(By.css('h1'));
      // 截掉 HTML 空白
      expect(titleEl.nativeElement.textContent.trim()).toEqual('Welcome to stock-market!');

      // 檢查模板中預設股價
      const nameEl = fixture.debugElement.query(By.css('.name'));
      expect(nameEl.nativeElement.textContent).toEqual('Test Stock Company - 1 (TSC)');
      const priceEl = fixture.debugElement.query(By.css('.price.positive'));
      expect(priceEl.nativeElement.textContent).toEqual('$ 85');
      const addToFavoriteBtnEl = fixture.debugElement.query(By.css('button'));
      expect(addToFavoriteBtnEl).toBeDefined();
    });

    it('should toggle stock favorite correctly', () => {
      expect(component.stockObj.favorite).toBeFalsy();
      let addToFavoriteBtnEl = fixture.debugElement.query(By.css('button'));
      expect(addToFavoriteBtnEl).toBeDefined();
      addToFavoriteBtnEl.triggerEventHandler('click', null);

      fixture.detectChanges();
      expect(component.stockObj.favorite).toBeTruthy();
      let changePriceBtnEl = fixture.debugElement.query(By.css('button'));
      expect(changePriceBtnEl).not.toEqual(addToFavoriteBtnEl);
    });
  });

});
