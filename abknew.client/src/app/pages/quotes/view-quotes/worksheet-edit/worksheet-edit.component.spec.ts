import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetEditComponent } from './worksheet-edit.component';

describe('WorksheetEditComponent', () => {
  let component: WorksheetEditComponent;
  let fixture: ComponentFixture<WorksheetEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorksheetEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorksheetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
