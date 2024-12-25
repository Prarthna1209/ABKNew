import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SpecificationsService } from '../../../../services/specifications.service';

@Component({
  selector: 'app-specifications-popup',
  templateUrl: './specifications-popup.component.html',
  styleUrl: './specifications-popup.component.css'
})
export class SpecificationsPopupComponent {
  inputData: any;
  editData: any;
  type: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<SpecificationsPopupComponent>,
    private buildr: FormBuilder,
    private service: SpecificationsService
  )
  {

  }

  ngOnInit(): void
  {
    this.inputData = this.data;
    this.type = this.inputData.type;
    if (this.inputData.id != '')
    {
      this.setPopupData(this.inputData.id);
    }
  }

  closePopup(): void
  {
    this.ref.close();
  }

  myform = this.buildr.group({
    name: this.buildr.control(''),
    created_at: this.buildr.control(''),
    updated_at: this.buildr.control(''),
    created_by: this.buildr.control(''),
    id: this.buildr.control('')
  });

  setPopupData(id: any)
  {
    this.service.getSpecificationById(id).subscribe(item =>
    {
      this.editData = item;
      this.myform.setValue({
        created_at: this.editData.created_at,
        created_by: this.editData.created_by,
        updated_at: this.editData.updated_at,
        name: this.editData.name,
        id: this.editData.id
      })
    });
  }

  addOrUpdate()
  {
    const id = this.myform.value.id || '';
    if (id != '')
    {
      this.updateSpecification(id);
    }
    else
    {
      this.saveItem();
    }
  }

  updateSpecification(id: any)
  {
    var item = {
      id: id,
      name: this.myform.value.name || '',
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      created_by: this.myform.value.created_by || ''
    };
    this.service.updateSpecification(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Specification updated successfully!");
        }
        else
        {
          alert("Specification not updated!");
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
      id: '',
      name: this.myform.value.name || '',
      type: this.type,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      created_by: this.myform.value.created_by || ''
    };
    this.service.createSpecification(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Specification created successfully!");
        }
        else
        {
          alert("Specification not created!");
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
