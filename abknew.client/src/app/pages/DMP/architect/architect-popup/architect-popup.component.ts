import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArchitectService } from '../../../../services/architect.service';

@Component({
  selector: 'app-architect-popup',
  templateUrl: './architect-popup.component.html',
  styleUrl: './architect-popup.component.css'
})
export class ArchitectPopupComponent implements OnInit
{
  inputData: any;
  editData: any;
  salesPersons: any;
  selectedValue: string = "-1";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ArchitectPopupComponent>,
    private buildr: FormBuilder,
    private service: ArchitectService
  )
  {

  }

  ngOnInit(): void
  {
    this.inputData = this.data;
    this.salesPersons = this.data.spDS;
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
    id: this.buildr.control(0),
    firstName: this.buildr.control(''),
    lastName: this.buildr.control(''),
    address: this.buildr.control(''),
    city: this.buildr.control(''),
    state: this.buildr.control(''),
    zipcode: this.buildr.control(''),
    email: this.buildr.control(''),
    password: this.buildr.control(''),
    phone: this.buildr.control(''),
    fax: this.buildr.control(''),
    website: this.buildr.control(''),
    comment: this.buildr.control(''),
    salespersonId: this.buildr.control(''),
    basicSteps: this.buildr.control(''),
    created_at: this.buildr.control('')
  });

  setPopupData(id: any)
  {
    this.service.getArchitectsById(id).subscribe(item =>
    {
      this.editData = item;
      this.myform.setValue({
        id: this.editData.id,
        firstName: this.editData.firstName,
        lastName: this.editData.lastName,
        address: this.editData.address,
        city: this.editData.city,
        state: this.editData.state,
        zipcode: this.editData.zipcode,
        email: this.editData.email,
        password: this.editData.password,
        phone: this.editData.phone,
        fax: this.editData.fax,
        website: this.editData.website,
        comment: this.editData.comment,
        salespersonId: this.editData.salespersonId,
        basicSteps: this.editData.basicSteps,
        created_at: this.editData.created_at
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
      created_at: new Date().toISOString(),
      firstName: this.myform.value.firstName || '',
      lastName: this.myform.value.lastName || '',
      address: this.myform.value.address || '',
      city: this.myform.value.city || '',
      state: this.myform.value.state || '',
      zipcode: this.myform.value.zipcode || '',
      email: this.myform.value.email || '',
      password: this.myform.value.password || '',
      phone: this.myform.value.phone || '',
      fax: this.myform.value.fax || '',
      website: this.myform.value.website || '',
      comment: this.myform.value.comment || '',
      salespersonId: this.myform.value.salespersonId || '',
      basicSteps: this.myform.value.basicSteps || '',

    };
    this.service.updateArchitects(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Architect updated successfully!");
        }
        else
        {
          alert("Architect not updated!");
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
      created_at: new Date().toISOString(),
      firstName: this.myform.value.firstName || '',
      lastName: this.myform.value.lastName || '',
      address: this.myform.value.address || '',
      city: this.myform.value.city || '',
      state: this.myform.value.state || '',
      zipcode: this.myform.value.zipcode || '',
      email: this.myform.value.email || '',
      password: this.myform.value.password || '',
      phone: this.myform.value.phone || '',
      fax: this.myform.value.fax || '',
      website: this.myform.value.website || '',
      comment: this.myform.value.comment || '',
      salespersonId: this.myform.value.salespersonId || '',
      basicSteps: this.myform.value.basicSteps || '',
    };
    this.service.createArchitects(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Architect created successfully!");
        }
        else
        {
          alert("Architect not created!");
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
