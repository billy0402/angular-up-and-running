import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StockListComponent} from './stock-list/stock-list.component';
import {StockCreateComponent} from './stock-create/stock-create.component';
import {StockDetailComponent} from './stock-detail/stock-detail.component';

import {AuthGuard} from '../guards/auth.guard';
import {StockCreateDeactivateGuard} from '../guards/stock-create-deactivate.guard';
import {StockLoadResolverService} from '../resolver/stock-load-resolver.service';

const routes: Routes = [
  {path: 'list', component: StockListComponent, canActivate: [AuthGuard]},
  {
    path: 'create', component: StockCreateComponent,
    canActivate: [AuthGuard], canDeactivate: [StockCreateDeactivateGuard]
  },
  {
    path: ':code', component: StockDetailComponent, canActivate: [AuthGuard],
    resolve: {stock: StockLoadResolverService}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule {
}
