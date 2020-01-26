import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent {

  // 宣告時不再初始化 FormGroup
  public stockForm: FormGroup;

  // 將 FormBuilder 實例注入建構元
  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm() {
    // 使用注入的 FormBuilder 建構 FormGroup
    this.stockForm = this.formBuilder.group({
      // 以空值初始化名稱控制項與必要的檢驗程序
      name: [null, Validators.required],
      code: [null, [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0)]]
    })
  }

  onSubmit() {
    console.log('Stock Form Value', this.stockForm.value);
  }

}
