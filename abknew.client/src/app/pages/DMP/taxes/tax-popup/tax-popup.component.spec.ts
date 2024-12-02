import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxPopupComponent } from './tax-popup.component';

describe('TaxPopupComponent', () => {
  let component: TaxPopupComponent;
  let fixture: ComponentFixture<TaxPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaxPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
