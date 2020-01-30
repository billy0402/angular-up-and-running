import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';
import {StockListComponent} from './stock/stock-list/stock-list.component';
import {StockCreateComponent} from './stock/stock-create/stock-create.component';
import {StockDetailComponent} from './stock/stock-detail/stock-detail.component';

// 宣告應用程式的路徑陣列
const appRoutes = [
  // 加入預設路徑以重新導向到 Login 頁
  // pathMatch 檢查 URL 與 full 是否完全相符
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'stock/list', component: StockListComponent},
  {path: 'stock/create', component: StockCreateComponent},
  {path: 'stock/:code', component: StockDetailComponent},
  // 加入捕捉全部不相符路徑重新導向到 Register 頁
  // pathMatch 預設為 prefix，檢查 URL 開頭與 path 是否相符
  {path: '**', redirectTo: '/register'}
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
