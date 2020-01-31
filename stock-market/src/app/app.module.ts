import { BrowserModule } from '@angular/platform-browser';
import { APP_ID, Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { APP_BASE_HREF, isPlatformBrowser } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { StockService } from './services/stock.service';
import { MessageService } from './services/message.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { StockLoadResolverService } from './resolver/stock-load-resolver.service';
import { StockAppInterceptor } from './services/stock-app.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { StockCreateDeactivateGuard } from './guards/stock-create-deactivate.guard';

// NgModule 這個 TypeScript 標記指出此類別定義為一個 Angular 模組
@NgModule({
  // 宣告應用程式中使用的 HTML 元件與指示
  declarations: [
    AppComponent
  ],
  // 匯入其他 Angular 應用程式與函式庫模組
  imports: [
    BrowserModule.withServerTransition({appId: 'stock-app'}),
    HttpClientModule,
    AppRoutingModule
  ],
  // 建構服務的單一實例
  providers: [
    StockService,
    MessageService,
    AuthService,
    UserService,
    StockLoadResolverService,
    AuthGuard,
    StockCreateDeactivateGuard,
    {
      // 提供什麼
      provide: HTTP_INTERCEPTORS,
      // 如何提供
      useClass: StockAppInterceptor,
      // 指出是個攔截程序陣列
      multi: true
    },
    {
      provide: APP_BASE_HREF,
      useValue: ''
    }
  ],
  // 啟動應用程式的進入元件
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string
  ) {
    const platform = isPlatformBrowser(platformId) ? 'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }

}
