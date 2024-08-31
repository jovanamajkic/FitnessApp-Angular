import { TestBed } from '@angular/core/testing';

import { ProgramHasAttributeValueService } from './program-has-attribute-value.service';

describe('ProgramHasAttributeValueService', () => {
  let service: ProgramHasAttributeValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramHasAttributeValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
