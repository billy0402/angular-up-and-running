import { TestBed } from '@angular/core/testing';

import { ProductLoadResolverService } from './product-load-resolver.service';

describe('ProductLoadResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductLoadResolverService = TestBed.get(ProductLoadResolverService);
    expect(service).toBeTruthy();
  });
});
