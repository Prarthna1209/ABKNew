import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../../material/material.module';
import { EmailAccountsService } from '../../../services/email-accounts.service';

@Component({
  selector: 'app-email-accounts',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule, MaterialModule
  ],
  templateUrl: './email-accounts.component.html',
  styleUrl: './email-accounts.component.css'
})
export class EmailAccountsComponent
{
  editData: any;
  selectedValue: string = "-1";
  siteSettingId: any;
  constructor(
    private buildr: FormBuilder,
    private service: EmailAccountsService
  )
  {

  }

  ngOnInit(): void
  {
    this.siteSettingId = sessionStorage.getItem('SiteSettingId');
    if (this.siteSettingId != '')
    {
      this.setPopupData(this.siteSettingId);
    }
  }

  myform = this.buildr.group({
    id: this.buildr.control(''),
    folloup_email: this.buildr.control(''),
    followup_password: this.buildr.control(''),
    takeoff_email: this.buildr.control(''),
    takeoff_password: this.buildr.control(''),
    bidReq_email: this.buildr.control(''),
    bidReq_password: this.buildr.control(''),
    createdAt: this.buildr.control(''),
    updatedAt: this.buildr.control('')
  });

  setPopupData(id: any)
  {
    this.service.getEmailAccountssById(id).subscribe(item =>
    {
      this.editData = item;
      this.myform.setValue({
        id: this.editData.id,
        folloup_email: this.editData.folloup_email,
        followup_password: this.editData.followup_password,
        takeoff_email: this.editData.takeoff_email,
        takeoff_password: this.editData.takeoff_password,
        bidReq_email: this.editData.bidReq_email,
        bidReq_password: this.editData.bidReq_password,
        createdAt: this.editData.createdAt,
        updatedAt: this.editData.updatedAt
      })
    });
  }

  addOrUpdate()
  {
    const id = this.myform.value.id || '';
    if (id != '')
    {
      this.updateEmailAccounts(id);
    }
    else
    {
      this.saveItem();
    }
  }

  closePopup()
  {

  }

  updateEmailAccounts(id: any)
  {
    var item = {
      id: id,
      created_at: new Date().toISOString(),
      folloup_email: this.myform.value.folloup_email || '',
      followup_password: this.myform.value.followup_password || '',
      takeoff_email: this.myform.value.takeoff_email || '',
      takeoff_password: this.myform.value.takeoff_password || '',
      bidReq_email: this.myform.value.bidReq_email || '',
      bidReq_password: this.myform.value.bidReq_password || '',
      createdAt: this.myform.value.createdAt || '',
      updatedAt: new Date().toISOString()
    };
    this.service.updateEmailAccounts(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("EmailAccounts updated successfully!");
        }
        else
        {
          alert("EmailAccounts not updated!");
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
      created_at: new Date().toISOString(),
      folloup_email: this.myform.value.folloup_email || '',
      followup_password: this.myform.value.followup_password || '',
      takeoff_email: this.myform.value.takeoff_email || '',
      takeoff_password: this.myform.value.takeoff_password || '',
      bidReq_email: this.myform.value.bidReq_email || '',
      bidReq_password: this.myform.value.bidReq_password || '',
      createdAt: new Date().toISOString() || '',
      updatedAt: new Date().toISOString()
    };
    this.service.createEmailAccountss(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("EmailAccounts created successfully!");
        }
        else
        {
          alert("EmailAccounts not created!");
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
