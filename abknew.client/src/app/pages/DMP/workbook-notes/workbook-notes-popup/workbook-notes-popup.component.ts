import { Component, Inject } from '@angular/core';
import { WorkbookNotesService } from '../../../../services/workbook-notes.service';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-workbook-notes-popup',
  templateUrl: './workbook-notes-popup.component.html',
  styleUrl: './workbook-notes-popup.component.css'
})
export class WorkbookNotesPopupComponent {
  inputData: any;
  editData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<WorkbookNotesPopupComponent>,
    private buildr: FormBuilder,
    private service: WorkbookNotesService
  )
  {

  }

  ngOnInit(): void
  {
    this.inputData = this.data;
    if (this.inputData.id > 0)
    {
      this.setPopupData(this.inputData.id);
    }
  }

  closePopup(): void
  {
    this.ref.close();
  }

  myform = this.buildr.group({
    note: this.buildr.control(''),
    created_at: this.buildr.control(''),
    created_by: this.buildr.control(''),
    updated_at: this.buildr.control(''),
    id: this.buildr.control(0)
  });

  setPopupData(id: any)
  {
    this.service.getWorkbookNoteById(id).subscribe(item =>
    {
      this.editData = item;
      this.myform.setValue({
        note: this.editData.note,
        created_at: this.editData.created_at,
        created_by: this.editData.created_by,
        updated_at: this.editData.updated_at,
        id: this.editData.id
      })
    });
  }

  addOrUpdate()
  {
    const id = this.myform.value.id || 0;
    if (id > 0)
    {
      this.updateShippingItem(id);
    }
    else
    {
      this.saveItem();
    }
  }

  updateShippingItem(id: any)
  {
    var item = {
      id: id,
      note: this.myform.value.note || '',
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      created_by: this.myform.value.created_by || ''
    };
    this.service.updateWorkbookNote(id,item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Workbook Note updated successfully!");
        }
        else
        {
          alert("Workbook Note not updated!");
        }
        this.closePopup();
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  saveItem(): any
  {
    console.log(this.myform.value);
    var item = {
      id: 0,
      note: this.myform.value.note || '',
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      created_by: this.myform.value.created_by || ''
    };
    this.service.createWorkbookNote(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Workbook Note created successfully!");
        }
        else
        {
          alert("Workbook Note not created!");
        }
        this.closePopup();
      },
      (error) =>
      {
        console.error(error);
        alert(error);
      }
    );
  }
}
