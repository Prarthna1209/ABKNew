import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdniComponent } from './pdni.component';

describe('PdniComponent', () => {
  let component: PdniComponent;
  let fixture: ComponentFixture<PdniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
