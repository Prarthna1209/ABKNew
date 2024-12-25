import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaxesService } from '../../../../services/taxes.service';

@Component({
  selector: 'app-tax-popup',
  templateUrl: './tax-popup.component.html',
  styleUrl: './tax-popup.component.css'
})
export class TaxPopupComponent implements OnInit {
  inputData: any;
  editData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<TaxPopupComponent>,
    private buildr: FormBuilder,
    private service: TaxesService
  )
  {

  }

  ngOnInit(): void
  {
    this.inputData = this.data;
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
    rate: this.buildr.control(''),
    region: this.buildr.control(''),
    id: this.buildr.control('')
  });

  setPopupData(id: any)
  {
    this.service.getTaxesById(id).subscribe(item =>
    {
      this.editData = item;
      this.myform.setValue({
        rate: this.editData.rate,
        region: this.editData.region,
        id: this.editData.id
      })
    });
  }

  addOrUpdate()
  {
    const id = this.myform.value.id || '';
    if (id != '')
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
      rate: parseFloat(this.myform.value.rate || "0"),
      region: this.myform.value.region || '',
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      created_by: "1"
    };
    this.service.updateTaxes(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Tax updated successfully!");
        }
        else
        {
          alert("Tax not updated!");
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
      rate: parseFloat(this.myform.value.rate || "0"),
      region: this.myform.value.region || '',
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      created_by: "1"
    };
    this.service.createTaxes(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Tax created successfully!");
        }
        else
        {
          alert("Tax not created!");
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
