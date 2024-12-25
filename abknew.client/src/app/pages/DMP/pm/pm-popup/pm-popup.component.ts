import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PmService } from '../../../../services/pm.service';

@Component({
  selector: 'app-pm-popup',
  templateUrl: './pm-popup.component.html',
  styleUrl: './pm-popup.component.css'
})
export class PmPopupComponent {
  inputData: any;
  editData: any;
  contractors: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<PmPopupComponent>,
    private buildr: FormBuilder,
    private service: PmService
  )
  {

  }

  ngOnInit(): void
  {
    this.inputData = this.data;
    this.contractors = this.data.contractors;
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
    id: this.buildr.control(''),
    firstName: this.buildr.control(''),
    lastName: this.buildr.control(''),
    email: this.buildr.control(''),
    phone: this.buildr.control(''),
    contractorId: this.buildr.control(''),
    createdAt: this.buildr.control('')
  });

  setPopupData(id: any)
  {
    this.service.getPMById(id).subscribe(item =>
    {
      this.editData = item;
      this.myform.setValue({
        id: this.editData.id,
        firstName: this.editData.firstName,
        lastName: this.editData.lastName,
        email: this.editData.email,
        phone: this.editData.phone,
        contractorId: this.editData.contractorId,
        createdAt: this.editData.createdAt
      })
    });
  }

  addOrUpdate()
  {
    const id = this.myform.value.id || '';
    if (id != '')
    {
      this.updatePM(id);
    }
    else
    {
      this.saveItem();
    }
  }

  updatePM(id: any)
  {
    var item = {
      id: id,
      createdAt: new Date().toISOString(),
      firstName: this.myform.value.firstName || '',
      lastName: this.myform.value.lastName || '',
      email: this.myform.value.email || '',
      phone: this.myform.value.phone || '',
      contractorId: this.myform.value.contractorId || '0',
    };
    this.service.updatePM(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Project Manager updated successfully!");
        }
        else
        {
          alert("Project Manager not updated!");
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
      createdAt: new Date().toISOString(),
      firstName: this.myform.value.firstName || '',
      lastName: this.myform.value.lastName || '',
      email: this.myform.value.email || '',
      phone: this.myform.value.phone || '',
      contractorId: this.myform.value.contractorId || '0',
    };
    this.service.createPM(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Project Manager created successfully!");
        }
        else
        {
          alert("Project Manager not created!");
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
