import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvOneComponent } from './tv-one-component';

describe('TvOneComponent', () => {
  let component: TvOneComponent;
  let fixture: ComponentFixture<TvOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvOneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TvOneComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
