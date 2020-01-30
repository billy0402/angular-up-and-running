import { TestBed, async, inject } from '@angular/core/testing';

import { StockCreateDeactivateGuard } from './stock-create-deactivate.guard';

describe('StockCreateDeactivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockCreateDeactivateGuard]
    });
  });

  it('should ...', inject([StockCreateDeactivateGuard], (guard: StockCreateDeactivateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
