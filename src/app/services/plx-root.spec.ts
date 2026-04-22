import { TestBed } from '@angular/core/testing';

import { PlxRoot } from './plx-root';

describe('PlxRoot', () => {
  let service: PlxRoot;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlxRoot);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
