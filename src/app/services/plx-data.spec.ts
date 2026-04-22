import { TestBed } from '@angular/core/testing';

import { PlxData } from './plx-data';

describe('PlxData', () => {
  let service: PlxData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlxData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
