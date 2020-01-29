import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {Stock} from '../../model/stock';
import {StockService} from '../../services/stock.service';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css'],
  // 在 providers 中宣告 MessageService
  providers: [MessageService]
})
export class StockCreateComponent {

  // 除了表單模型，還加上 Stock 模型物件
  private stock: Stock;
  // 宣告時不再初始化 FormGroup
  public stockForm: FormGroup;
  public exchanges: string[] = ['NYSE', 'NASDAQ', 'OTHER'];
  public confirmed: boolean = false;

  // 將 StockService. MessageService. FormBuilder 實例注入建構元
  constructor(private stockService: StockService,
              public messageService: MessageService,
              private formBuilder: FormBuilder) {
    this.createForm();
    // 呼叫 initializeStock 以建構股票實例
    this.initializeStock();
    // 在元件中加入 MessageService 的初始值
    this.messageService.message = 'Component Level: Hello Message Service!';
  }

  // 定義 initializeStock 方法供重複使用
  initializeStock() {
    this.stock = {
      name: '',
      code: '',
      price: 0,
      previousPrice: 0,
      exchange: this.exchanges[1],
      favorite: false,
      notablePeople: []
    };
  }

  get name() {
    return this.stockForm.get('name');
  }

  get code() {
    return this.stockForm.get('code');
  }

  get price() {
    return this.stockForm.get('price');
  }

  // 方便從模板存取 FormArray 的 getter
  get notablePeople(): FormArray {
    return this.stockForm.get('notablePeople') as FormArray;
  }

  createForm() {
    // 使用注入的 FormBuilder 建構 FormGroup
    this.stockForm = this.formBuilder.group({
      // 以空值初始化名稱控制項與必要的檢驗程序
      name: [null, Validators.required],
      code: [null, [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0)]],
      exchange: this.exchanges[1],
      // notablePeople 初始化為 FormArray 實例
      notablePeople: this.formBuilder.array([])
    });
  }

  // 將新的 FormGroup 實例加入 FormArray
  addNotablePerson() {
    this.notablePeople.push(this.formBuilder.group({
      name: ['', Validators.required],
      title: ['', Validators.required]
    }));
  }

  // 從 FormArray 刪除特定 FormGroup 實例
  removeNotablePerson(index: number) {
    this.notablePeople.removeAt(index);
  }

  onSubmit() {
    if (this.stockForm.invalid) {
      console.error('Stock form is an invalid state');
      this.messageService.message = 'Please correct all errors and resubmit the form.';
      return;
    }

    this.stock = {...this.stockForm.value};
    this.stock.previousPrice = this.stock.price;

    // 提交表單時，呼叫 stockService.createStock
    // 處理建構股票時的成功或失敗
    // 兩種建構狀況均使用 MessageService
    this.stockService.createStock(this.stock)
      // 訂閱可觀察
      .subscribe((result: any) => {
        this.messageService.message = result.msg;
        // 成功建構股票後，使用 initializeStock
        this.initializeStock();
        this.stockForm.reset({name: null, code: null, price: 0, exchange: 'NASDAQ', notablePeople: []});
      }, (err) => {
        this.messageService.message = err.error.msg;
      });
  }

  resetForm() {
    // 重置表單到初始狀態
    this.stockForm.reset();
  }

}
