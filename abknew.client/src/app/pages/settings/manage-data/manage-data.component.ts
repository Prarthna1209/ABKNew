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
  selector: 'app-manage-data',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule, MaterialModule
  ],
  templateUrl: './manage-data.component.html',
  styleUrl: './manage-data.component.css'
})
export class ManageDataComponent {
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
    datA_MonthShow: this.buildr.control(''),
    datA_QuoteShow: this.buildr.control(''),
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
        datA_MonthShow: this.editData.datA_MonthShow,
        datA_QuoteShow: this.editData.datA_QuoteShow,
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
      datA_MonthShow: this.myform.value.datA_MonthShow || '',
      datA_QuoteShow: this.myform.value.datA_QuoteShow || '',
      createdAt: this.myform.value.createdAt || '',
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
      datA_MonthShow: this.myform.value.datA_MonthShow || '',
      datA_QuoteShow: this.myform.value.datA_QuoteShow || '',
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
