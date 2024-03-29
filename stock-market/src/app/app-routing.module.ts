import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

// 宣告應用程式的路徑陣列
const appRoutes = [
  // 加入預設路徑以重新導向到 Login 頁
  // pathMatch 檢查 URL 與 full 是否完全相符
  {path: '', redirectTo: '/user/login', pathMatch: 'full'},
  {path: 'stock', loadChildren: './stock/stock.module#StockModule'},
  {path: 'user', loadChildren: './user/user.module#UserModule'},
  // 加入捕捉全部不相符路徑重新導向到 Register 頁
  // pathMatch 預設為 prefix，檢查 URL 開頭與 path 是否相符
  {path: '**', redirectTo: '/user/register'}
];

@NgModule({
  declarations: [],
  // 匯入並登記根應用程式的路徑
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  // 匯出 RouterModule 使匯入 AppRoutingModule 的模組可存取路由指令
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
