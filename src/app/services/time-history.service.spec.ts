import { TestBed } from '@angular/core/testing';

import { TimeHistoryService } from './time-history.service';

describe('TimeHistoryService', () => {
  let service: TimeHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
