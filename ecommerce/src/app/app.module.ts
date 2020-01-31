import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

import { AppRoutingModule } from './app-routing.module';
import { ProductService } from './services/product.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { LocalStorageService } from './services/local-storage.service';
import { ProductLoadResolverService } from './resolver/product-load-resolver.service';
import { AuthGuard } from './guards/auth.guard';
import { ProductCreateDeactivateGuard } from './guards/product-create-deactivate.guard';
import { ProductAppInterceptor } from './services/product-app.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ProductItemComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductDetailComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ProductService,
    AuthService,
    UserService,
    LocalStorageService,
    ProductLoadResolverService,
    AuthGuard,
    ProductCreateDeactivateGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProductAppInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
