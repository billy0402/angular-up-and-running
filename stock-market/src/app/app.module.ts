import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
// 匯入新建構的 stock-item 元件
import { StockItemComponent } from './stock/stock-item/stock-item.component';
import { StockCreateComponent } from './stock/stock-create/stock-create.component';
import { StockListComponent } from './stock/stock-list/stock-list.component';

import { StockService } from './services/stock.service';
import { MessageService } from './services/message.service';

// NgModule 這個 TypeScript 標記指出此類別定義為一個 Angular 模組
@NgModule({
  // 宣告應用程式中使用的 HTML 元件與指示
  declarations: [
    AppComponent,
    // 將新元件加入 declarations
    StockItemComponent,
    StockCreateComponent,
    StockListComponent
  ],
  // 匯入其他 Angular 應用程式與函式庫模組
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  // 建構服務的單一實例
  providers: [
    StockService,
    MessageService
  ],
  // 啟動應用程式的進入元件
  bootstrap: [AppComponent]
})
export class AppModule { }
