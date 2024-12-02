import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContractorsService } from '../../../../services/contractors.service';

@Component({
  selector: 'app-contractor-popup',
  templateUrl: './contractor-popup.component.html',
  styleUrl: './contractor-popup.component.css'
})
export class ContractorPopupComponent implements OnInit
{
  inputData: any;
  editData: any;
  salesPersons: any;
  isActiveLabel: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ContractorPopupComponent>,
    private buildr: FormBuilder,
    private service: ContractorsService
  )
  {
  }

  ngOnInit(): void
  {
    this.inputData = this.data;
    this.salesPersons = this.inputData.spDS;
    this.isActiveLabel = this.data.isActiveLabel;
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
    companyAddress: this.buildr.control(''),
    city: this.buildr.control(''),
    state: this.buildr.control(''),
    zipcode: this.buildr.control(''),
    email: this.buildr.control(''),
    phone: this.buildr.control(''),
    fax: this.buildr.control(''),
    website: this.buildr.control(''),
    isActive: this.buildr.control(''),
    salespersonId: this.buildr.control(''),
    officePhone: this.buildr.control(''),
    customerName: this.buildr.control(''),
    created_at: this.buildr.control('')
  });

  setPopupData(id: any)
  {
    this.service.getContractorById(id).subscribe(item =>
    {
      this.editData = item;
      this.myform.setValue({
        id: this.editData.id,
        firstName: this.editData.firstName,
        lastName: this.editData.lastName,
        companyAddress: this.editData.address,
        city: this.editData.city,
        state: this.editData.state,
        zipcode: this.editData.zipcode,
        email: this.editData.email,
        phone: this.editData.phone,
        fax: this.editData.fax,
        website: this.editData.website,
        isActive: this.editData.isActive,
        salespersonId: this.editData.salespersonId,
        officePhone: this.editData.officePhone,
        customerName: this.editData.customerName,
        created_at: this.editData.created_at
      })
    });
  }

  addOrUpdate()
  {
    const id = this.myform.value.id || 0;
    if (id > 0)
    {
      this.updateContractor(id);
    }
    else
    {
      this.saveItem();
    }
  }

  updateContractor(id: any)
  {
    var item = {
      id: id,
      created_at: new Date().toISOString(),
      firstName: this.myform.value.firstName || '',
      lastName: this.myform.value.lastName || '',
      companyAddress: this.myform.value.companyAddress || '',
      city: this.myform.value.city || '',
      state: this.myform.value.state || '',
      zipcode: this.myform.value.zipcode || '',
      email: this.myform.value.email || '',
      customerName: this.myform.value.customerName || '',
      phone: this.myform.value.phone || '',
      fax: this.myform.value.fax || '',
      website: this.myform.value.website || '',
      isActive: this.myform.value.isActive || '',
      salespersonId: parseInt(this.myform.value.salespersonId || '0'),
      officePhone: this.myform.value.officePhone || '',

    };
    this.service.updateContractor(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Contractor updated successfully!");
        }
        else
        {
          alert("Contractor not updated!");
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
      companyAddress: this.myform.value.companyAddress || '',
      city: this.myform.value.city || '',
      state: this.myform.value.state || '',
      zipcode: this.myform.value.zipcode || '',
      email: this.myform.value.email || '',
      customerName: this.myform.value.customerName || '',
      phone: this.myform.value.phone || '',
      fax: this.myform.value.fax || '',
      website: this.myform.value.website || '',
      isActive: this.myform.value.isActive || '',
      salespersonId: parseInt(this.myform.value.salespersonId || '0'),
      officePhone: this.myform.value.officePhone || '',
    };
    this.service.createContractor(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Contractor created successfully!");
        }
        else
        {
          alert("Contractor not created!");
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
