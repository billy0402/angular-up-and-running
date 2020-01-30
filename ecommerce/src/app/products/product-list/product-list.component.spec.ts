import {async, inject, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {ProductListComponent} from './product-list.component';
import {ProductItemComponent} from '../product-item/product-item.component';
import {Product} from '../../model/product';
import {ProductService} from '../../services/product.service';

describe('Product List Component', () => {
  // describe('Isolated unit tests', () => {
  //   it('should create 3 stocks on init', () => {
  //     const component = new ProductListComponent();
  //     component.ngOnInit();
  //     expect(component.products.length).toEqual(3);
  //   });
  //
  //   it('should find and update quantity onQuantityChange', () => {
  //     const component = new ProductListComponent();
  //     component.ngOnInit();
  //
  //     assertProducts(component.products, [0, 0, 0]);
  //     component.onQuantityChange({changeInQuantity: 2, product: getProduct(2)});
  //
  //     assertProducts(component.products, [0, 2, 0]);
  //
  //     component.onQuantityChange({changeInQuantity: 2, product: getProduct(2)});
  //     component.onQuantityChange({changeInQuantity: 1, product: getProduct(1)});
  //     assertProducts(component.products, [1, 4, 0]);
  //
  //     component.onQuantityChange({changeInQuantity: -3, product: getProduct(2)});
  //     assertProducts(component.products, [1, 1, 0]);
  //   });
  //
  //   function assertProducts(products, expectedQuantities) {
  //     expect(products[0].id).toEqual(1);
  //     expect(products[0].quantityInCart).toEqual(expectedQuantities[0]);
  //     expect(products[1].id).toEqual(2);
  //     expect(products[1].quantityInCart).toEqual(expectedQuantities[1]);
  //     expect(products[2].id).toEqual(3);
  //     expect(products[2].quantityInCart).toEqual(expectedQuantities[2]);
  //   }
  //
  //   function getProduct(id: number): Product {
  //     return {
  //       id: id,
  //       name: 'Test Product',
  //       price: 100,
  //       imageUrl: 'Random Image',
  //       isOnSale: false,
  //       quantityInCart: 0
  //     };
  //   }
  // });

  describe('Angular tests', () => {
    let fixture, component, httpBackend, products;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ProductListComponent, ProductItemComponent],
        providers: [ProductService],
        imports: [HttpClientModule, HttpClientTestingModule, FormsModule]
      }).compileComponents();
    }));

    beforeEach(async(inject([HttpTestingController], (backend: HttpTestingController) => {
      httpBackend = backend;
      fixture = TestBed.createComponent(ProductListComponent);
      component = fixture.componentInstance;
      products = [
        {
          id: 1,
          name: 'Test Product - 1',
          imageUrl: '',
          price: 50,
          isOnSale: true,
          quantityInCart: 0
        },
        {
          id: 2,
          name: 'Test Product - 2',
          imageUrl: '',
          price: 150,
          isOnSale: true,
          quantityInCart: 0
        }
      ];

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        httpBackend.expectOne('/api/product?q=', 'Get lists of products')
          .flush(products);
      });
    })));

    it('should render three product list items', async(() => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const productItems = fixture.debugElement.queryAll(By.css('app-product-item'));
        expect(productItems.length).toEqual(2);
        assertProduct(productItems[0], 'Test Product - 1', 50, 0);
        assertProduct(productItems[1], 'Test Product - 2', 150, 0);
      });
    }));

    it('should handle increment item correctly and reload all products', async(() => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const productItems = fixture.debugElement.queryAll(By.css('app-product-item'));

        assertProduct(productItems[1], 'Test Product - 2', 150, 0);
        const incrementBtnForSecondProduct = productItems[1].query(By.css('button.increment'));
        incrementBtnForSecondProduct.triggerEventHandler('click', null);
        fixture.detectChanges();

        let httpReq = httpBackend.expectOne({
          url: '/api/product/2',
          method: 'PATCH'
        });
        expect(httpReq.request.body).toEqual({changeInQuantity: 1});
        httpReq.flush({msg: 'Success'});

        fixture.whenStable().then(() => {
          fixture.detectChanges();
          httpBackend.expectOne('/api/product?q=', 'Get lists of products')
            .flush([
              {
                id: 1,
                name: 'Test Product - 1',
                imageUrl: '',
                price: 50,
                isOnSale: true,
                quantityInCart: 0
              }, {
                id: 2,
                name: 'Test Product - 2',
                imageUrl: '',
                price: 150,
                isOnSale: true,
                quantityInCart: 5
              }
            ]);
        });

        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const productItems = fixture.debugElement.queryAll(By.css('app-product-item'));
          expect(productItems.length).toEqual(2);
          assertProduct(productItems[1], 'Test Product - 2', 150, 5);
        });
      });
    }));

    function assertProduct(element, name, price, quantity) {
      const nameEl = element.query(By.css('.name'));
      expect(nameEl.nativeElement.textContent).toEqual(name);
      const priceEl = element.query(By.css('.price'));
      expect(priceEl.nativeElement.textContent).toEqual(`NT$ ${price}`);
      const qtyEl = element.query(By.css('.quantity'));
      expect(qtyEl.nativeElement.textContent).toEqual(quantity + '');
    }
  });
});
