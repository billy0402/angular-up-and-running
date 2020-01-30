import {async, ComponentFixture, fakeAsync, flush, inject, TestBed, tick} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {StockCreateComponent} from './stock-create.component';
import {StockService} from '../../services/stock.service';

describe('StockCreateComponent With Real Service', () => {
  let component: StockCreateComponent;
  let fixture: ComponentFixture<StockCreateComponent>;
  let httpBackend: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StockCreateComponent],
      providers: [StockService],
      // StockCreateComponent 需要 ReactiveFormsModule
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    httpBackend = backend;
    fixture = TestBed.createComponent(StockCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // 以 async 的回傳值作為 it 函式的第二個參數
  it('should create stock through service', async(() => {
    expect(component).toBeTruthy();
    component.stockForm.setValue({
      name: 'My New Test Stock',
      code: 'MNTS',
      price: 100,
      exchange: 'NYSE',
      notablePeople: []
    });
    component.onSubmit();

    httpBackend.expectOne({
      url: '/api/stock',
      method: 'POST'
    }, 'Create Stock with Failure')
      .flush({
        msg: 'Stock with code MNTS successfully created.'
      });

    // 等待測試執行非同步流程
    fixture.whenStable().then(() => {
      // 改變後更新視圖
      fixture.detectChanges();
      expect(component.messageService.message).toEqual('Stock with code MNTS successfully created.');
      const messageEl = fixture.debugElement.query(By.css('.message')).nativeElement;
      expect(messageEl.textContent).toBe('Stock with code MNTS successfully created.');
    });
  }));

  // 使用 fakeAsync 取代 async
  it('should create stock through service with fake async', fakeAsync(() => {
    expect(component).toBeTruthy();
    component.stockForm.setValue({
      name: 'My New Test Stock',
      code: 'MNTS',
      price: 100,
      exchange: 'NYSE',
      notablePeople: []
    });
    component.onSubmit();

    httpBackend.expectOne({
      url: '/api/stock',
      method: 'POST'
    }, 'Create Stock with Failure')
      .flush({
        msg: 'Stock with code MNTS successfully created.'
      });

    // 使用 tick() 模擬非同步行為
    tick(1000); // 模擬時間
    // flush(1); // 模擬次數
    // 改變後更新視圖
    fixture.detectChanges();
    expect(component.messageService.message).toEqual('Stock with code MNTS successfully created.');
    const messageEl = fixture.debugElement.query(By.css('.message')).nativeElement;
    expect(messageEl.textContent).toBe('Stock with code MNTS successfully created.');
  }));

  it('should make call to stock and handle failure', async(() => {
    expect(component).toBeTruthy();
    component.stockForm.setValue({
      name: 'My New Test Stock',
      code: 'MNTS',
      price: 100,
      exchange: 'NYSE',
      notablePeople: []
    });
    component.onSubmit();

    let formValue = component.stockForm.value;
    let newStock = {...formValue, previousPrice: formValue.price};

    // 預期測試過程中對 /api/stock 發出一個 POST 請求
    let httpReq = httpBackend.expectOne({
      url: '/api/stock',
      method: 'POST'
    }, 'Create Stock with Failure');
    // 確保 POST 請求的內容與元件中建構的股票相同
    expect(httpReq.request.body).toEqual(newStock);
    // 定義 POST 請求的回應為 400 失敗
    httpReq.flush({msg: 'Stock already exists.'}, {status: 400, statusText: 'Failed!'});

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const messageEl = fixture.debugElement.query(By.css('.message')).nativeElement;
      // 檢查伺服器回應正確的被元件顯示
      expect(messageEl.textContent).toEqual('Stock already exists.');
    });
  }));

  afterEach(() => {
    // 確保 POST 請求在測試中發生
    httpBackend.verify();
  });
});
