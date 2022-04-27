import { TestBed } from '@angular/core/testing';

import { PentabilitiesServiceService } from './pentabilities-service.service';

describe('PentabilitiesServiceService', () => {
  let service: PentabilitiesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PentabilitiesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
