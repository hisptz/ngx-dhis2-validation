import { TestBed } from '@angular/core/testing';

import { ValidationDataService } from './validation-data.service';

describe('ValidationDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidationDataService = TestBed.get(ValidationDataService);
    expect(service).toBeTruthy();
  });
});
