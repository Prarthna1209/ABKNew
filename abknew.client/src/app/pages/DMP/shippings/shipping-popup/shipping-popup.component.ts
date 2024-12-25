import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShippingsService } from '../../../../services/shippings.service';

@Component({
  selector: 'app-shipping-popup',
  templateUrl: './shipping-popup.component.html',
  styleUrl: './shipping-popup.component.css'
})
export class ShippingPopupComponent implements OnInit
{
  inputData: any;
  editData: any;
  type: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ShippingPopupComponent>,
    private buildr: FormBuilder,
    private service: ShippingsService
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
    type: this.buildr.control('TO'),
    name: this.buildr.control(''),
    id: this.buildr.control('')
  });

  setPopupData(id: any)
  {
    this.service.getShippingsById(id).subscribe(item =>
    {
      this.editData = item;
      this.myform.setValue({
        type: this.editData.type,
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
      this.updateShipping(id);
    }
    else
    {
      this.saveItem();
    }
  }

  updateShipping(id: any)
  {
    var item = {
      id: id,
      type: this.type,
      name: this.myform.value.name || '',
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      created_by: "1"
    };
    this.service.updateShippings(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Shipping updated successfully!");
        }
        else
        {
          alert("Shipping not updated!");
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
      created_by: "1"
    };
    this.service.createShippings(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Shipping created successfully!");
        }
        else
        {
          alert("Shipping not created!");
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
