import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvTwoComponent } from './tv-two-component';

describe('TvTwoComponent', () => {
  let component: TvTwoComponent;
  let fixture: ComponentFixture<TvTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvTwoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TvTwoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
