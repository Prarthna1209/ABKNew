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
    if (this.siteSettingId != '')
    {
      this.setPopupData(this.siteSettingId);
    }
  }

  myform = this.buildr.group({
    id: this.buildr.control(''),
    smtp_host: this.buildr.control(''),
    smtp_port: this.buildr.control(''),
    smtp_security: this.buildr.control(''),
    smtp_username: this.buildr.control(''),
    smtp_password: this.buildr.control(''),
    smtp_fromEmail: this.buildr.control(''),
    smtp_fromName: this.buildr.control(''),
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
        smtp_host: this.editData.smtp_host,
        smtp_port: this.editData.smtp_port,
        smtp_security: this.editData.smtp_security,
        smtp_username: this.editData.smtp_username,
        smtp_password: this.editData.smtp_password,
        smtp_fromEmail: this.editData.smtp_fromEmail,
        smtp_fromName: this.editData.smtp_fromName,
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
      smtp_host: this.myform.value.smtp_host || '',
      smtp_port: this.myform.value.smtp_port || '',
      smtp_security: this.myform.value.smtp_security || '',
      smtp_username: this.myform.value.smtp_username || '',
      smtp_password: this.myform.value.smtp_password || '',
      smtp_fromEmail: this.myform.value.smtp_fromEmail || '',
      smtp_fromName: this.myform.value.smtp_fromName || '',
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
      smtp_host: this.myform.value.smtp_host || '',
      smtp_port: this.myform.value.smtp_port || '',
      smtp_security: this.myform.value.smtp_security || '',
      smtp_username: this.myform.value.smtp_username || '',
      smtp_password: this.myform.value.smtp_password || '',
      smtp_fromEmail: this.myform.value.smtp_fromEmail || '',
      smtp_fromName: this.myform.value.smtp_fromName || '',
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
