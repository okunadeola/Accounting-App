import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstviewComponent } from './firstview.component';

describe('FirstviewComponent', () => {
  let component: FirstviewComponent;
  let fixture: ComponentFixture<FirstviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
