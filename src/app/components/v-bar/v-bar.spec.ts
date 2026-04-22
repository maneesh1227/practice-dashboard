import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VBar } from './v-bar';

describe('VBar', () => {
  let component: VBar;
  let fixture: ComponentFixture<VBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VBar],
    }).compileComponents();

    fixture = TestBed.createComponent(VBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
