import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidderPopupComponent } from './bidder-popup.component';

describe('BidderPopupComponent', () => {
  let component: BidderPopupComponent;
  let fixture: ComponentFixture<BidderPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BidderPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BidderPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
