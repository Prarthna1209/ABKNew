import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorPopupComponent } from './contractor-popup.component';

describe('ContractorPopupComponent', () => {
  let component: ContractorPopupComponent;
  let fixture: ComponentFixture<ContractorPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractorPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
