import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// NgModule 這個 TypeScript 標記指出此類別定義為一個 Angular 模組
@NgModule({
  // 宣告應用程式中使用的 HTML 元件與指示
  declarations: [
    AppComponent
  ],
  // 匯入其他 Angular 應用程式與函式庫模組
  imports: [
    BrowserModule
  ],
  providers: [],
  // 啟動應用程式的進入元件
  bootstrap: [AppComponent]
})
export class AppModule { }
