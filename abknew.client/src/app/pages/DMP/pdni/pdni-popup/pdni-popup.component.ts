import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PdniService } from '../../../../services/pdni.service';

@Component({
  selector: 'app-pdni-popup',
  templateUrl: './pdni-popup.component.html',
  styleUrl: './pdni-popup.component.css'
})
export class PdniPopupComponent {
  inputData: any;
  editData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<PdniPopupComponent>,
    private buildr: FormBuilder,
    private service: PdniService
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
    name: this.buildr.control(''),
    isFeatured: this.buildr.control(''),
    created_by: this.buildr.control(''),
    id: this.buildr.control(0)
  });

  setPopupData(id: any)
  {
    this.service.getPdniById(id).subscribe(item =>
    {
      this.editData = item;
      this.myform.setValue({
        name: this.editData.name,
        isFeatured: this.editData.isFeatured,
        created_by: this.editData.created_by,
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
      name: this.myform.value.name || '',
      isFeatured: (String(this.myform.value.isFeatured).toLowerCase() === 'true'),
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      created_by: this.myform.value.created_by || '0'
    };
    this.service.updatePdni(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Pdni updated successfully!");
        }
        else
        {
          alert("Pdni not updated!");
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
      name: this.myform.value.name || '',
      isFeatured: (String(this.myform.value.isFeatured).toLowerCase() === 'true'),
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      created_by: this.myform.value.created_by || '0'
    };
    this.service.createPdni(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Pdni created successfully!");
        }
        else
        {
          alert("Pdni not created!");
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
