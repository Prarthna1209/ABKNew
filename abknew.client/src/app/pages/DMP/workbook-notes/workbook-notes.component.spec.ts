import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkbookNotesComponent } from './workbook-notes.component';

describe('WorkbookNotesComponent', () => {
  let component: WorkbookNotesComponent;
  let fixture: ComponentFixture<WorkbookNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkbookNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkbookNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
