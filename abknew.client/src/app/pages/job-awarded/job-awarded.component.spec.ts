import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAwardedComponent } from './job-awarded.component';

describe('JobAwardedComponent', () => {
  let component: JobAwardedComponent;
  let fixture: ComponentFixture<JobAwardedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobAwardedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobAwardedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
