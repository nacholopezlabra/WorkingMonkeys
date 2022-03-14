import { TestBed } from '@angular/core/testing';

import { UserRankingService } from './user-ranking.service';

describe('UserRankingService', () => {
  let service: UserRankingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRankingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
