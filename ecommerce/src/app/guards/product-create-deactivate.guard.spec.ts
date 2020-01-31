import { TestBed, async, inject } from '@angular/core/testing';

import { ProductCreateDeactivateGuard } from './product-create-deactivate.guard';

describe('ProductCreateDeactivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductCreateDeactivateGuard]
    });
  });

  it('should ...', inject([ProductCreateDeactivateGuard], (guard: ProductCreateDeactivateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
