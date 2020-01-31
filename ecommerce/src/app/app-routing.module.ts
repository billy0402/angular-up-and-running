import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';
import {ProductListComponent} from './products/product-list/product-list.component';
import {ProductCreateComponent} from './products/product-create/product-create.component';
import {ProductDetailComponent} from './products/product-detail/product-detail.component';

import {AuthGuard} from './guards/auth.guard';
import {ProductCreateDeactivateGuard} from './guards/product-create-deactivate.guard';
import {ProductLoadResolverService} from './resolver/product-load-resolver.service';

const appRoute = [
  {path: '', redirectTo: '/product/list', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'product/list', component: ProductListComponent},
  {
    path: 'product/create', component: ProductCreateComponent,
    canActivate: [AuthGuard], canDeactivate: [ProductCreateDeactivateGuard]
  },
  {
    path: 'product/:id', component: ProductDetailComponent, canActivate: [AuthGuard],
    resolve: {product: ProductLoadResolverService}
  },
  {path: '**', redirectTo: '/product/list'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoute)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
