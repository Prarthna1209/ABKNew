import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmPopupComponent } from './pm-popup.component';

describe('PmPopupComponent', () => {
  let component: PmPopupComponent;
  let fixture: ComponentFixture<PmPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PmPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
