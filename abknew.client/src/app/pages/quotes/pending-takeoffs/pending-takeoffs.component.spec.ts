import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTakeoffsComponent } from './pending-takeoffs.component';

describe('PendingTakeoffsComponent', () => {
  let component: PendingTakeoffsComponent;
  let fixture: ComponentFixture<PendingTakeoffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingTakeoffsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingTakeoffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
