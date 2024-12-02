import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkbookNotesPopupComponent } from './workbook-notes-popup.component';

describe('WorkbookNotesPopupComponent', () => {
  let component: WorkbookNotesPopupComponent;
  let fixture: ComponentFixture<WorkbookNotesPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkbookNotesPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkbookNotesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
