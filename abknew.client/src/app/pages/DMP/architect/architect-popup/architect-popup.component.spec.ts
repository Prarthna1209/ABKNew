import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitectPopupComponent } from './architect-popup.component';

describe('ArchitectPopupComponent', () => {
  let component: ArchitectPopupComponent;
  let fixture: ComponentFixture<ArchitectPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArchitectPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchitectPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
