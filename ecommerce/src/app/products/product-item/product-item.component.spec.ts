import {async, TestBed} from "@angular/core/testing";
import {By} from '@angular/platform-browser';

import {ProductItemComponent} from './product-item.component';
import {ProductQuantityChange} from '../../model/productQuantityChange';

describe('Product Item Component', () => {
  let fixture, component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    component.product = {
      id: 2,
      name: 'Product Test',
      price: 80,
      imageUrl: 'compare_macbook_pro_16_spacegray__dx8anpw8a9qq_large_2x',
      isOnSale: true,
      quantityInCart: 2
    };
    fixture.detectChanges();
  });

  it('should render the product correctly', () => {
    // We added these CSS classes to the component template as well!
    const nameEl = fixture.debugElement.query(By.css('.name'));
    expect(nameEl.nativeElement.textContent).toEqual(component.product.name);
    const priceEl = fixture.debugElement.query(By.css('.price'));
    expect(priceEl.nativeElement.textContent).toEqual(`NT$ ${component.product.price}`);
    const qtyEl = fixture.debugElement.query(By.css('.quantity'));
    expect(qtyEl.nativeElement.textContent).toEqual('2');
  });

  it('should handle quantity increment correctly', () => {
    let quantityChange: ProductQuantityChange;
    component.quantityChange.subscribe(change => quantityChange = change);

    const incrementBtnEl = fixture.debugElement.query(By.css('button.increment'));
    incrementBtnEl.triggerEventHandler('click', null);

    expect(quantityChange).toBeDefined();
    expect(quantityChange.changeInQuantity).toEqual(1);
    expect(quantityChange.product.id).toEqual(2);
  });

  it('should handle quantity decrement correctly', () => {
    let quantityChange: ProductQuantityChange;
    component.quantityChange.subscribe(change => quantityChange = change);

    const decrementBtnEl = fixture.debugElement.query(By.css('button.decrement'));
    decrementBtnEl.triggerEventHandler('click', null);

    expect(quantityChange).toBeDefined();
    expect(quantityChange.changeInQuantity).toEqual(-1);
    expect(quantityChange.product.id).toEqual(2);
  });
});
