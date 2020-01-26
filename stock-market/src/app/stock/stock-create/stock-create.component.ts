import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {Stock} from '../../model/stock';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent {

  // 除了表單模型，還加上 Stock 模型物件
  private stock: Stock;
  // 宣告時不再初始化 FormGroup
  public stockForm: FormGroup;

  // 將 FormBuilder 實例注入建構元
  constructor(private formBuilder: FormBuilder) {
    this.createForm();
    // 以一些預設值初始化股票模型
    this.stock = new Stock('Test', 'TST', 20, 10);
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
      // notablePeople 初始化為 FormArray 實例
      notablePeople: this.formBuilder.array([])
    })
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
    this.stock = {...this.stockForm.value};
    console.log('Saving stock', this.stock);
  }

  resetForm() {
    // 重置表單到初始狀態
    this.stockForm.reset();
  }

}
