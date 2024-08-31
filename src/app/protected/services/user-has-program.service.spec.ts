import { TestBed } from '@angular/core/testing';

import { UserHasProgramService } from './user-has-program.service';

describe('UserHasProgramService', () => {
  let service: UserHasProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserHasProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
