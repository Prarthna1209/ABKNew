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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-general-settings',
  standalone: true,
  imports: [
    CommonModule, MatFormFieldModule, MatInputModule, FormsModule,
    MatButtonModule, MatTableModule, MaterialModule, MatSlideToggleModule
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
  geN_loginLogo: any;
  geN_headerLogo: any;
  geN_emailLogo: any;
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
    if (this.siteSettingId && this.siteSettingId != '')
    {
      this.setPopupData(this.siteSettingId);
    }
  }

  myform = this.buildr.group({
    id: this.buildr.control(''),
    geN_loginLogo: this.buildr.control(''),
    geN_headerLogo: this.buildr.control(''),
    geN_emailLogo: this.buildr.control(''),
    geN_companyName: this.buildr.control(''),
    geN_frontWebsite: this.buildr.control(''),
    geN_backendApp: this.buildr.control(''),
    geN_officeAdd: this.buildr.control(''),
    geN_phone: this.buildr.control(''),
    geN_fax: this.buildr.control(''),
    geN_email: this.buildr.control(''),
    geN_clock1Label: this.buildr.control(''),
    geN_clock1Time: this.buildr.control(''),
    geN_clock1Active: this.buildr.control(''),
    geN_clock2Label: this.buildr.control(''),
    geN_clock2Time: this.buildr.control(''),
    geN_clock2Active: this.buildr.control(''),
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
        geN_loginLogo: this.editData.geN_LoginLogo || '',
        geN_headerLogo: this.editData.geN_HeaderLogo || '',
        geN_emailLogo: this.editData.geN_EmailLogo || '',
        geN_companyName: this.editData.geN_CompanyName || '',
        geN_frontWebsite: this.editData.geN_FrontWebsite || '',
        geN_backendApp: this.editData.geN_BackendApp || '',
        geN_officeAdd: this.editData.geN_OfficeAdd || '',
        geN_phone: this.editData.geN_Phone || '',
        geN_fax: this.editData.geN_Fax || '',
        geN_email: this.editData.geN_Email || '',
        geN_clock1Label: this.editData.geN_Clock1Label || '',
        geN_clock1Time: this.editData.geN_Clock1Time || '',
        geN_clock1Active: this.editData.geN_Clock1Active || false,
        geN_clock2Label: this.editData.geN_Clock2Label || '',
        geN_clock2Time: this.editData.geN_Clock2Time || '',
        geN_clock2Active: this.editData.geN_Clock2Active || false,
        createdAt: this.editData.createdAt,
        updatedAt: this.editData.updatedAt
      })
    });
  }

  selectHeaderLogo(event: any)
  {
    this.geN_headerLogo = event.target.files;
  }

  selectLoginLogo(event: any)
  {
    this.geN_loginLogo = event.target.files;
  }

  selectEmailLogo(event: any)
  {
    this.geN_emailLogo = event.target.files;
  }

  addOrUpdate()
  {
    const id = this.siteSettingId || '';
    if (this.geN_headerLogo && this.geN_headerLogo != '')
      this.uploadService.uploadfile(this.geN_headerLogo[0]);
    if (this.geN_loginLogo && this.geN_loginLogo != '')
      this.uploadService.uploadfile(this.geN_loginLogo[0]);
    if (this.geN_emailLogo && this.geN_emailLogo != '')
      this.uploadService.uploadfile(this.geN_emailLogo[0]);
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
      geN_loginLogo: this.geN_loginLogo ? this.geN_loginLogo[0].name : '',
      geN_headerLogo: this.geN_headerLogo ? this.geN_headerLogo[0].name : '',
      geN_emailLogo: this.geN_emailLogo ? this.geN_emailLogo[0].name : '',
      geN_companyName: this.myform.value.geN_companyName || '',
      geN_frontWebsite: this.myform.value.geN_frontWebsite || '',
      geN_backendApp: this.myform.value.geN_backendApp || '',
      geN_officeAdd: this.myform.value.geN_officeAdd || '',
      geN_phone: this.myform.value.geN_phone || '',
      geN_fax: this.myform.value.geN_fax || '',
      geN_email: this.myform.value.geN_email || '',
      geN_clock1Label: this.myform.value.geN_clock1Label || '',
      geN_clock1Time: this.myform.value.geN_clock1Time || '',
      geN_clock1Active: (this.myform.value.geN_clock1Active || 'false').toLowerCase() == 'true',
      geN_clock2Label: this.myform.value.geN_clock2Label || '',
      geN_clock2Time: this.myform.value.geN_clock2Time || '',
      geN_clock2Active: (this.myform.value.geN_clock2Active || 'false').toLowerCase() == 'true',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.service.updateSiteSettings(id, item).subscribe(
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
      geN_loginLogo: this.geN_loginLogo ? this.geN_loginLogo[0].name : '',
      geN_headerLogo: this.geN_headerLogo ? this.geN_headerLogo[0].name : '',
      geN_emailLogo: this.geN_emailLogo ? this.geN_emailLogo[0].name : '',
      geN_companyName: this.myform.value.geN_companyName || '',
      geN_frontWebsite: this.myform.value.geN_frontWebsite || '',
      geN_backendApp: this.myform.value.geN_backendApp || '',
      geN_officeAdd: this.myform.value.geN_officeAdd || '',
      geN_phone: this.myform.value.geN_phone || '',
      geN_fax: this.myform.value.geN_fax || '',
      geN_email: this.myform.value.geN_email || '',
      geN_clock1Label: this.myform.value.geN_clock1Label || '',
      geN_clock1Time: this.myform.value.geN_clock1Time || '',
      geN_clock1Active: (this.myform.value.geN_clock1Active || 'false').toLowerCase() == 'true',
      geN_clock2Label: this.myform.value.geN_clock2Label || '',
      geN_clock2Time: this.myform.value.geN_clock2Time || '',
      geN_clock2Active: (this.myform.value.geN_backendApp || 'false').toLowerCase() == 'true',
      createdAt: new Date().toISOString(),
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
