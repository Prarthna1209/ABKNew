import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsApiComponent } from './ups-api.component';

describe('UpsApiComponent', () => {
  let component: UpsApiComponent;
  let fixture: ComponentFixture<UpsApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpsApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpsApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
