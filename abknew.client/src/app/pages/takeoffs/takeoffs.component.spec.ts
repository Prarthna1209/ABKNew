import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeoffsComponent } from './takeoffs.component';

describe('TakeoffsComponent', () => {
  let component: TakeoffsComponent;
  let fixture: ComponentFixture<TakeoffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TakeoffsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakeoffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
