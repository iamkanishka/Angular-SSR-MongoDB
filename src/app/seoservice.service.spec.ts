import { TestBed } from '@angular/core/testing';

import { SeoserviceService } from './seoservice.service';

describe('SeoserviceService', () => {
  let service: SeoserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
