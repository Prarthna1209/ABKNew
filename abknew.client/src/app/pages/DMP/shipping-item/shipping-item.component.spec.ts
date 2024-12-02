import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingItemComponent } from './shipping-item.component';

describe('ShippingItemComponent', () => {
  let component: ShippingItemComponent;
  let fixture: ComponentFixture<ShippingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShippingItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
