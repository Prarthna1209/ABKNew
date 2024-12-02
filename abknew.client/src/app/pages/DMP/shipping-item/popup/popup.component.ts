import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShippingItemService } from '../../../../services/shipping-item.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit
{
  inputData: any;
  editData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<PopupComponent>,
    private buildr: FormBuilder,
    private service: ShippingItemService
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
    title: this.buildr.control(''),
    id: this.buildr.control(0)
  });


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
      title: this.myform.value.title || '',
      updated_by: "2",
      created_by: "",
      created_at: new Date().toISOString()
    };
    this.service.updateShippingItem(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Shipping item updated successfully!");
        }
        else
        {
          alert("Shipping item not updated!");
        }
        this.closePopup();
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  deleteItem(id: any)
  {
    this.service.deleteShippingItem(id).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Shipping item deleted successfully!");
        }
        else
        {
          alert("Shipping item not deleted!");
        }
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
      title: this.myform.value.title || '',
      updated_by: "",
      created_by: "1",
      created_at: new Date().toISOString()
    };
    this.service.createShippingItem(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Shipping item created successfully!");
        }
        else
        {
          alert("Shipping item not created!");
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

  setPopupData(id: any)
  {
    this.service.getShippingItemById(id).subscribe(item =>
    {
      this.editData = item;
      this.myform.setValue({
        title: this.editData.title,
        id: this.editData.id
      })
    });
  }

}
