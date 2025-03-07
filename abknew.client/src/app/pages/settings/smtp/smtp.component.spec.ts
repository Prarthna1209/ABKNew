import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmtpComponent } from './smtp.component';

describe('SmtpComponent', () => {
  let component: SmtpComponent;
  let fixture: ComponentFixture<SmtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmtpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
