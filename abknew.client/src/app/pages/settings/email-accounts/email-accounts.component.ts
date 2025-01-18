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
    this.siteSettingId = sessionStorage.getItem('EmailAccountsId');
    if (this.siteSettingId && this.siteSettingId != '')
    {
      this.setPopupData(this.siteSettingId);
    }
  }

  myform = this.buildr.group({
    id: this.buildr.control(''),
    folloup_Email: this.buildr.control(''),
    followup_Password: this.buildr.control(''),
    takeoff_Email: this.buildr.control(''),
    takeoff_Password: this.buildr.control(''),
    bidReq_Email: this.buildr.control(''),
    bidReq_Password: this.buildr.control(''),
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
        folloup_Email: this.editData.folloup_Email ?? "",
        followup_Password: this.editData.followup_Password ?? "",
        takeoff_Email: this.editData.takeoff_Email ?? "",
        takeoff_Password: this.editData.takeoff_Password ?? "",
        bidReq_Email: this.editData.bidReq_Email ?? "",
        bidReq_Password: this.editData.bidReq_Password ?? "",
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
      folloup_email: this.myform.value.folloup_Email || '',
      followup_password: this.myform.value.followup_Password || '',
      takeoff_email: this.myform.value.takeoff_Email || '',
      takeoff_password: this.myform.value.takeoff_Password || '',
      bidReq_email: this.myform.value.bidReq_Email || '',
      bidReq_password: this.myform.value.bidReq_Password || '',
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
      folloup_email: this.myform.value.folloup_Email || '',
      followup_password: this.myform.value.followup_Password || '',
      takeoff_email: this.myform.value.takeoff_Email || '',
      takeoff_password: this.myform.value.takeoff_Password || '',
      bidReq_email: this.myform.value.bidReq_Email || '',
      bidReq_password: this.myform.value.bidReq_Password || '',
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
