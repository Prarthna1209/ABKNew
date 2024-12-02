import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationsPopupComponent } from './specifications-popup.component';

describe('SpecificationsPopupComponent', () => {
  let component: SpecificationsPopupComponent;
  let fixture: ComponentFixture<SpecificationsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecificationsPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificationsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
