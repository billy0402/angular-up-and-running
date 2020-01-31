import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {StockRoutingModule} from './stock-routing.module';
import {StockItemComponent} from './stock-item/stock-item.component';
import {StockCreateComponent} from './stock-create/stock-create.component';
import {StockListComponent} from './stock-list/stock-list.component';
import {StockDetailComponent} from './stock-detail/stock-detail.component';


@NgModule({
  declarations: [
    StockItemComponent,
    StockCreateComponent,
    StockListComponent,
    StockDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    StockRoutingModule
  ]
})
export class StockModule {
}
