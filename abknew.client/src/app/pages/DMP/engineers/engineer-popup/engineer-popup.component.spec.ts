import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerPopupComponent } from './engineer-popup.component';

describe('EngineerPopupComponent', () => {
  let component: EngineerPopupComponent;
  let fixture: ComponentFixture<EngineerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EngineerPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
