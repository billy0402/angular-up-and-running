import {async, ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {StockCreateComponent} from './stock-create.component';
import {StockService} from '../../services/stock.service';

describe('StockCreateComponent', () => {
  let component: StockCreateComponent;
  let fixture: ComponentFixture<StockCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StockCreateComponent],
      providers: [StockService],
      // StockCreateComponent 需要 ReactiveFormsModule
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

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

    // 使用 tick() 模擬非同步行為
    tick(1000); // 模擬時間
    // flush(1); // 模擬次數
    // 改變後更新視圖
    fixture.detectChanges();
    expect(component.messageService.message).toEqual('Stock with code MNTS successfully created.');
    const messageEl = fixture.debugElement.query(By.css('.message')).nativeElement;
    expect(messageEl.textContent).toBe('Stock with code MNTS successfully created.');
  }));
});
