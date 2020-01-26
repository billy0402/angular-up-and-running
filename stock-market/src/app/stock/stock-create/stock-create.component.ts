import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent {

  public nameControl = new FormControl();

  constructor() {
  }

  onSubmit() {
    console.log('Name Control Value', this.nameControl.value);
  }

}
