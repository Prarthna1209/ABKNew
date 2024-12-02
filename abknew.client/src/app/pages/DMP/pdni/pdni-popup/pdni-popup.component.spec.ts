import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdniPopupComponent } from './pdni-popup.component';

describe('PdniPopupComponent', () => {
  let component: PdniPopupComponent;
  let fixture: ComponentFixture<PdniPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdniPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdniPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
