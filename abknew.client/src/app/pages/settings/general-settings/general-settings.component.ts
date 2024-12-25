import { Component } from '@angular/core';
import { FormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../../material/material.module';
import { Router } from '@angular/router';
import { SiteSettingsService } from '../../../services/site-settings.service';
import { CommonModule } from '@angular/common';
import { UploadService } from '../../../services/upload.service';

@Component({
  selector: 'app-general-settings',
  standalone: true,
  imports: [
    CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule, MaterialModule
  ],
  templateUrl: './general-settings.component.html',
  styleUrl: './general-settings.component.css'
})
export class GeneralSettingsComponent
{
  editData: any;
  selectedValue: string = "-1";
  siteSettingId: any;
  selectedFiles: any;
  gen_loginLogo: any;
  gen_headerLogo: any;
  gen_emailLogo: any;
  constructor(
    private buildr: FormBuilder,
    private service: SiteSettingsService,
    private uploadService: UploadService,
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
    gen_loginLogo: this.buildr.control(''),
    gen_headerLogo: this.buildr.control(''),
    gen_emailLogo: this.buildr.control(''),
    gen_companyName: this.buildr.control(''),
    gen_frontWebsite: this.buildr.control(''),
    gen_backendApp: this.buildr.control(''),
    gen_officeAdd: this.buildr.control(''),
    gen_phone: this.buildr.control(''),
    gen_fax: this.buildr.control(''),
    gen_email: this.buildr.control(''),
    gen_clock1Label: this.buildr.control(''),
    gen_clock1Time: this.buildr.control(''),
    gen_clock1Active: this.buildr.control(''),
    gen_clock2Label: this.buildr.control(''),
    gen_clock2Time: this.buildr.control(''),
    gen_clock2Active: this.buildr.control(''),
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
        gen_loginLogo: this.editData.gen_loginLogo,
        gen_headerLogo: this.editData.gen_headerLogo,
        gen_emailLogo: this.editData.gen_emailLogo,
        gen_companyName: this.editData.gen_companyName,
        gen_frontWebsite: this.editData.gen_frontWebsite,
        gen_backendApp: this.editData.gen_backendApp,
        gen_officeAdd: this.editData.gen_officeAdd,
        gen_phone: this.editData.gen_phone,
        gen_fax: this.editData.gen_fax,
        gen_email: this.editData.gen_email,
        gen_clock1Label: this.editData.gen_clock1Label,
        gen_clock1Time: this.editData.gen_clock1Time,
        gen_clock1Active: this.editData.gen_clock1Active,
        gen_clock2Label: this.editData.gen_clock2Label,
        gen_clock2Time: this.editData.gen_clock2Time,
        gen_clock2Active: this.editData.gen_clock2Active,
        createdAt: this.editData.createdAt,
        updatedAt: this.editData.updatedAt
      })
    });
  }

  selectHeaderLogo(event: any)
  {
    this.gen_headerLogo = event.target.files;
  }

  selectLoginLogo(event: any)
  {
    this.gen_loginLogo = event.target.files;
  }

  selectEmailLogo(event: any)
  {
    this.gen_emailLogo = event.target.files;
  }

  addOrUpdate()
  {
    const id = this.myform.value.id || '';
    this.uploadService.uploadfile(this.gen_headerLogo[0]);
    this.uploadService.uploadfile(this.gen_loginLogo[0]);
    this.uploadService.uploadfile(this.gen_emailLogo[0]);
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
      created_at: new Date().toISOString(),
      gen_loginLogo: this.gen_loginLogo[0].name || '',
      gen_headerLogo: this.gen_headerLogo[0].name || '',
      gen_emailLogo: this.gen_emailLogo[0].name || '',
      gen_companyName: this.myform.value.gen_companyName || '',
      gen_frontWebsite: this.myform.value.gen_frontWebsite || '',
      gen_backendApp: this.myform.value.gen_backendApp || '',
      gen_officeAdd: this.myform.value.gen_officeAdd || '',
      gen_phone: this.myform.value.gen_phone || '',
      gen_fax: this.myform.value.gen_fax || '',
      gen_email: this.myform.value.gen_email || '',
      gen_clock1Label: this.myform.value.gen_clock1Label || '',
      gen_clock1Time: this.myform.value.gen_clock1Time || '',
      gen_clock1Active: (this.myform.value.gen_clock1Active || 'false').toLowerCase() == 'true',
      gen_clock2Label: this.myform.value.gen_clock2Label || '',
      gen_clock2Time: this.myform.value.gen_clock2Time || '',
      gen_clock2Active: (this.myform.value.gen_clock2Active || 'false').toLowerCase() == 'true',
      createdAt: this.myform.value.createdAt || '',
      updatedAt: new Date().toISOString()
    };
    this.service.updateSiteSettings(id,item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("GeneralSettings updated successfully!");
        }
        else
        {
          alert("GeneralSettings not updated!");
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
      gen_loginLogo: this.gen_loginLogo[0].name || '',
      gen_headerLogo: this.gen_headerLogo[0].name || '',
      gen_emailLogo: this.gen_emailLogo[0].name || '',
      gen_companyName: this.myform.value.gen_companyName || '',
      gen_frontWebsite: this.myform.value.gen_frontWebsite || '',
      gen_backendApp: this.myform.value.gen_backendApp || '',
      gen_officeAdd: this.myform.value.gen_officeAdd || '',
      gen_phone: this.myform.value.gen_phone || '',
      gen_fax: this.myform.value.gen_fax || '',
      gen_email: this.myform.value.gen_email || '',
      gen_clock1Label: this.myform.value.gen_clock1Label || '',
      gen_clock1Time: this.myform.value.gen_clock1Time || '',
      gen_clock1Active: (this.myform.value.gen_clock1Active || 'false').toLowerCase() == 'true',
      gen_clock2Label: this.myform.value.gen_clock2Label || '',
      gen_clock2Time: this.myform.value.gen_clock2Time || '',
      gen_clock2Active: (this.myform.value.gen_backendApp || 'false').toLowerCase() == 'true',
      createdAt: new Date().toISOString() || '',
      updatedAt: new Date().toISOString()
    };
    this.service.createSiteSettings(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("GeneralSettings created successfully!");
        }
        else
        {
          alert("GeneralSettings not created!");
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
