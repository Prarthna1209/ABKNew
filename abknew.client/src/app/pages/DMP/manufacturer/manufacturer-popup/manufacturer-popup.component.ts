import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ManufecturersService } from '../../../../services/manufecturers.service';

@Component({
  selector: 'app-manufacturer-popup',
  templateUrl: './manufacturer-popup.component.html',
  styleUrl: './manufacturer-popup.component.css'
})
export class ManufacturerPopupComponent {
  inputData: any;
  editData: any;
  featuredLabel: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ManufacturerPopupComponent>,
    private buildr: FormBuilder,
    private service: ManufecturersService
  )
  {
    this.featuredLabel = "Is Featured";
  }

  ngOnInit(): void
  {
    this.inputData = this.data;
    this.featuredLabel = "Is Featured";
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
    tlp: this.buildr.control(''),
    ttl: this.buildr.control(''),
    isFeatured: this.buildr.control(''),
    created_by: this.buildr.control(''),
    id: this.buildr.control(0)
  });

  setPopupData(id: any)
  {
    this.service.getManufacturerById(id).subscribe(item =>
    {
      this.editData = item;
      this.myform.setValue({
        name: this.editData.name,
        ttl: this.editData.ttl,
        tlp: this.editData.tlp,
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
      ttl: parseFloat(this.myform.value.ttl || '0.0'),
      tlp: parseFloat(this.myform.value.tlp || '0.0'),
      isFeatured: (String(this.myform.value.isFeatured).toLowerCase() === 'true'),
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      created_by: this.myform.value.created_by || '0'
    };
    this.service.updateManufacturer(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Manufacturer updated successfully!");
        }
        else
        {
          alert("Manufacturer not updated!");
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
      ttl: parseFloat(this.myform.value.ttl || '0.0'),
      tlp: parseFloat(this.myform.value.tlp || '0.0'),
      isFeatured: (String(this.myform.value.isFeatured).toLowerCase() === 'true'),
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      created_by: this.myform.value.created_by || '0'
    };
    this.service.createManufacturer(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Manufacturer created successfully!");
        }
        else
        {
          alert("Manufacturer not created!");
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
