import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryAppComponent } from './inventory-app.component';

describe('InventoryAppComponent', () => {
  let component: InventoryAppComponent;
  let fixture: ComponentFixture<InventoryAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
