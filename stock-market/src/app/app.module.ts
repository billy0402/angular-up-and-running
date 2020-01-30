import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
// 匯入新建構的 stock-item 元件
import { StockItemComponent } from './stock/stock-item/stock-item.component';
import { StockCreateComponent } from './stock/stock-create/stock-create.component';
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { StockDetailComponent } from './stock/stock-detail/stock-detail.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

import { StockService } from './services/stock.service';
import { MessageService } from './services/message.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { StockAppInterceptor } from './services/stock-app.interceptor';

// NgModule 這個 TypeScript 標記指出此類別定義為一個 Angular 模組
@NgModule({
  // 宣告應用程式中使用的 HTML 元件與指示
  declarations: [
    AppComponent,
    // 將新元件加入 declarations
    StockItemComponent,
    StockCreateComponent,
    StockListComponent,
    StockDetailComponent,
    LoginComponent,
    RegisterComponent
  ],
  // 匯入其他 Angular 應用程式與函式庫模組
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  // 建構服務的單一實例
  providers: [
    StockService,
    MessageService,
    AuthService,
    UserService,
    {
      // 提供什麼
      provide: HTTP_INTERCEPTORS,
      // 如何提供
      useClass: StockAppInterceptor,
      // 指出是個攔截程序陣列
      multi: true
    }
  ],
  // 啟動應用程式的進入元件
  bootstrap: [AppComponent]
})
export class AppModule { }
