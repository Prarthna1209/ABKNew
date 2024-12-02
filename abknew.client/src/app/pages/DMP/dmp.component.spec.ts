import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DMPComponent } from './dmp.component';

describe('DMPComponent', () => {
  let component: DMPComponent;
  let fixture: ComponentFixture<DMPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DMPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DMPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
