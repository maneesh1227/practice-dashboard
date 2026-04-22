import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiData } from './multi-data';

describe('MultiData', () => {
  let component: MultiData;
  let fixture: ComponentFixture<MultiData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiData],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiData);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
