import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {ProductCreateComponent} from './product-create.component';
import {ProductService} from '../../services/product.service';

describe('Product Create Component', () => {
  let component: ProductCreateComponent;
  let fixture: ComponentFixture<ProductCreateComponent>;
  let httpBackend: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCreateComponent],
      providers: [ProductService],
      imports: [HttpClientModule, HttpClientTestingModule, ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    httpBackend = backend;
    fixture = TestBed.createComponent(ProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create products successfully', async(() => {
    component.productForm.setValue({
      name: 'Test Product',
      price: 80,
      imageUrl: 'https://www.google.com.tw',
      isOnSale: false
    });
    component.createProduct();

    let httpReq = httpBackend.expectOne({
      url: '/api/product',
      method: 'POST'
    }, 'Create Product');
    expect(httpReq.request.body).toEqual(component.productForm.value);
    httpReq.flush({msg: 'Success!'});

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const messageEl = fixture.debugElement.query(By.css('.error')).nativeElement;
      expect(messageEl.textContent).toEqual('Product successfully created.');
    });
  }));

  it('should handle create products failure', async(() => {
    component.productForm.setValue({
      name: 'Test Product',
      price: 80,
      imageUrl: 'https://www.google.com.tw',
      isOnSale: false
    });
    component.createProduct();

    let httpReq = httpBackend.expectOne({
      url: '/api/product',
      method: 'POST'
    }, 'Create Product');
    expect(httpReq.request.body).toEqual(component.productForm.value);
    httpReq.flush({msg: 'Failed!'}, {status: 400, statusText: 'Failed!'});

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const messageEl = fixture.debugElement.query(By.css('.error')).nativeElement;
      expect(messageEl.textContent).toEqual('Unable to create product, please try again.');
    });
  }));
});
