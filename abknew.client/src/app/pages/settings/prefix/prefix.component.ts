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
  selector: 'app-prefix',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule, MaterialModule
  ],
  templateUrl: './prefix.component.html',
  styleUrl: './prefix.component.css'
})
export class PrefixComponent {
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
    prefix_takeoff: this.buildr.control(''),
    prefix_quote: this.buildr.control(''),
    prefix_job: this.buildr.control(''),
    prefix_aw: this.buildr.control(''),
    prefix_aWF: this.buildr.control(''),
    prefix_sBC: this.buildr.control(''),
    prefix_sPL: this.buildr.control(''),
    prefix_j: this.buildr.control(''),
    prefix_q: this.buildr.control(''),
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
        prefix_takeoff: this.editData.prefix_takeoff,
        prefix_quote: this.editData.prefix_quote,
        prefix_job: this.editData.prefix_job,
        prefix_aw: this.editData.prefix_aw,
        prefix_aWF: this.editData.prefix_aWF,
        prefix_sBC: this.editData.prefix_sBC,
        prefix_sPL: this.editData.prefix_sPL,
        prefix_j: this.editData.prefix_j,
        prefix_q: this.editData.prefix_q,
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
      prefix_takeoff: this.myform.value.prefix_takeoff || '',
      prefix_quote: this.myform.value.prefix_quote || '',
      prefix_job: this.myform.value.prefix_job || '',
      prefix_aw: this.myform.value.prefix_aw || '',
      prefix_aWF: this.myform.value.prefix_aWF || '',
      prefix_sBC: this.myform.value.prefix_sBC || '',
      prefix_sPL: this.myform.value.prefix_sPL || '',
      prefix_j: this.myform.value.prefix_j || '',
      prefix_q: this.myform.value.prefix_q || '',
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
      prefix_takeoff: this.myform.value.prefix_takeoff || '',
      prefix_quote: this.myform.value.prefix_quote || '',
      prefix_job: this.myform.value.prefix_job || '',
      prefix_aw: this.myform.value.prefix_aw || '',
      prefix_aWF: this.myform.value.prefix_aWF || '',
      prefix_sBC: this.myform.value.prefix_sBC || '',
      prefix_sPL: this.myform.value.prefix_sPL || '',
      prefix_j: this.myform.value.prefix_j || '',
      prefix_q: this.myform.value.prefix_q || '',
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
