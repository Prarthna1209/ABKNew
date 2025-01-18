import { Component } from '@angular/core';
import { FormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { SiteSettingsService } from '../../../services/site-settings.service';

@Component({
  selector: 'app-smtp',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule, MaterialModule
  ],
  templateUrl: './smtp.component.html',
  styleUrl: './smtp.component.css'
})
export class SmtpComponent {
  editData: any;
  selectedValue: string = "-1";
  siteSettingId: any;
  constructor(
    private buildr: FormBuilder,
    private service: SiteSettingsService,
    private router: Router
  )
  {

  }

  ngOnInit(): void
  {
    this.siteSettingId = sessionStorage.getItem('SiteSettingId');
    if (this.siteSettingId && this.siteSettingId != '')
    {
      this.setPopupData(this.siteSettingId);
    }
  }

  myform = this.buildr.group({
    id: this.buildr.control(''),
    smtP_Host: this.buildr.control(''),
    smtP_Port: this.buildr.control(''),
    smtP_Security: this.buildr.control(''),
    smtP_Username: this.buildr.control(''),
    smtP_Password: this.buildr.control(''),
    smtP_FromEmail: this.buildr.control(''),
    smtP_FromName: this.buildr.control(''),
    createdAt: this.buildr.control(''),
    updatedAt: this.buildr.control('')
  });

  setPopupData(id: any)
  {
    this.service.getSiteSettingsById(id).subscribe(item =>
    {
      this.editData = item;
      this.myform.setValue({
        id: this.editData.id,
        smtP_Host: this.editData.smtP_Host,
        smtP_Port: this.editData.smtP_Port,
        smtP_Security: this.editData.smtP_Security,
        smtP_Username: this.editData.smtP_Username,
        smtP_Password: this.editData.smtP_Password,
        smtP_FromEmail: this.editData.smtP_FromEmail,
        smtP_FromName: this.editData.smtP_FromName,
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
      this.updateGeneralSettings(id);
    }
    else
    {
      this.saveItem();
    }
  }

  closePopup()
  {

  }

  updateGeneralSettings(id: any)
  {
    var item = {
      id: id,
      smtP_Host: this.myform.value.smtP_Host || '',
      smtP_Port: this.myform.value.smtP_Port || '',
      smtP_Security: this.myform.value.smtP_Security || '',
      smtP_Username: this.myform.value.smtP_Username || '',
      smtP_Password: this.myform.value.smtP_Password || '',
      smtP_FromEmail: this.myform.value.smtP_FromEmail || '',
      smtP_FromName: this.myform.value.smtP_FromName || '',
      createdAt: this.myform.value.createdAt || '',
      updatedAt: new Date().toISOString()
    };
    this.service.updateSiteSettings(id, item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("SMTP updated successfully!");
        }
        else
        {
          alert("SMTP not updated!");
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
      smtP_Host: this.myform.value.smtP_Host || '',
      smtP_Port: this.myform.value.smtP_Port || '',
      smtP_Security: this.myform.value.smtP_Security || '',
      smtP_Username: this.myform.value.smtP_Username || '',
      smtP_Password: this.myform.value.smtP_Password || '',
      smtP_FromEmail: this.myform.value.smtP_FromEmail || '',
      smtP_FromName: this.myform.value.smtP_FromName || '',
      createdAt: new Date().toISOString() || '',
      updatedAt: new Date().toISOString()
    };
    this.service.createSiteSettings(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("SMTP created successfully!");
        }
        else
        {
          alert("SMTP not created!");
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
