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
  selector: 'app-theme',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule, MaterialModule
  ],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.css'
})
export class ThemeComponent {
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
    themE_Current: this.buildr.control(''),
    themE_InvoiceTemp: this.buildr.control(''),
    themE_QuotePaperSize: this.buildr.control(''),
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
        themE_Current: this.editData.themE_Current,
        themE_InvoiceTemp: this.editData.themE_InvoiceTemp,
        themE_QuotePaperSize: this.editData.themE_QuotePaperSize,
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
      created_at: new Date().toISOString(),
      themE_Current: this.myform.value.themE_Current || '',
      themE_InvoiceTemp: this.myform.value.themE_InvoiceTemp || '',
      themE_QuotePaperSize: this.myform.value.themE_QuotePaperSize || '',
      createdAt: this.myform.value.createdAt || '',
      updatedAt: new Date().toISOString()
    };
    this.service.updateSiteSettings(id, item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Theme updated successfully!");
        }
        else
        {
          alert("Theme not updated!");
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
      themE_Current: this.myform.value.themE_Current || '',
      themE_InvoiceTemp: this.myform.value.themE_InvoiceTemp || '',
      themE_QuotePaperSize: this.myform.value.themE_QuotePaperSize || '',
      createdAt: new Date().toISOString() || '',
      updatedAt: new Date().toISOString()
    };
    this.service.createSiteSettings(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Theme created successfully!");
        }
        else
        {
          alert("Theme not created!");
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
