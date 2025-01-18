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
    if (this.siteSettingId && this.siteSettingId != '')
    {
      this.setPopupData(this.siteSettingId);
    }
  }

  myform = this.buildr.group({
    id: this.buildr.control(''),
    prefix_Takeoff: this.buildr.control(''),
    prefix_Quote: this.buildr.control(''),
    prefix_Job: this.buildr.control(''),
    prefix_AW: this.buildr.control(''),
    prefix_AWF: this.buildr.control(''),
    prefix_SBC: this.buildr.control(''),
    prefix_SPL: this.buildr.control(''),
    prefix_J: this.buildr.control(''),
    prefix_Q: this.buildr.control(''),
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
        prefix_Takeoff: this.editData.prefix_Takeoff,
        prefix_Quote: this.editData.prefix_Quote,
        prefix_Job: this.editData.prefix_Job,
        prefix_AW: this.editData.prefix_AW,
        prefix_AWF: this.editData.prefix_AWF,
        prefix_SBC: this.editData.prefix_SBC,
        prefix_SPL: this.editData.prefix_SPL,
        prefix_J: this.editData.prefix_J,
        prefix_Q: this.editData.prefix_Q,
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
      created_At: new Date().toISOString(),
      prefix_Takeoff: this.myform.value.prefix_Takeoff || '',
      prefix_Quote: this.myform.value.prefix_Quote || '',
      prefix_Job: this.myform.value.prefix_Job || '',
      prefix_AW: this.myform.value.prefix_AW || '',
      prefix_AWF: this.myform.value.prefix_AWF || '',
      prefix_SBC: this.myform.value.prefix_SBC || '',
      prefix_SPL: this.myform.value.prefix_SPL || '',
      prefix_J: this.myform.value.prefix_J || '',
      prefix_Q: this.myform.value.prefix_Q || '',
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
      prefix_Takeoff: this.myform.value.prefix_Takeoff || '',
      prefix_Quote: this.myform.value.prefix_Quote || '',
      prefix_Job: this.myform.value.prefix_Job || '',
      prefix_AW: this.myform.value.prefix_AW || '',
      prefix_AWF: this.myform.value.prefix_AWF || '',
      prefix_SBC: this.myform.value.prefix_SBC || '',
      prefix_SPL: this.myform.value.prefix_SPL || '',
      prefix_J: this.myform.value.prefix_J || '',
      prefix_Q: this.myform.value.prefix_Q || '',
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
