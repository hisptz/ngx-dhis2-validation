import { TestBed } from '@angular/core/testing';

import { DataAnalyticsService } from './data-analytics.service';

describe('DataAnalyticsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataAnalyticsService = TestBed.get(DataAnalyticsService);
    expect(service).toBeTruthy();
  });
});
