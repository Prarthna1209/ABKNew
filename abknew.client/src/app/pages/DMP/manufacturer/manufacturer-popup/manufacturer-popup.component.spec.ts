import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerPopupComponent } from './manufacturer-popup.component';

describe('ManufacturerPopupComponent', () => {
  let component: ManufacturerPopupComponent;
  let fixture: ComponentFixture<ManufacturerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManufacturerPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
