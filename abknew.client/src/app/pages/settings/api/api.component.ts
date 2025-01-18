import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { SiteSettingsService } from '../../../services/site-settings.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../../material/material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-api',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule, MaterialModule
  ],
  templateUrl: './api.component.html',
  styleUrl: './api.component.css'
})
export class ApiComponent
{
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

  //closePopup(): void
  //{
  //  this.ref.close();
  //}

  myform = this.buildr.group({
    id: this.buildr.control(''),
    apI_AccessToken: this.buildr.control(''),
    apI_ClientSecret: this.buildr.control('')
  });

  setPopupData(id: any)
  {
    this.service.getSiteSettingsById(id).subscribe(item =>
    {
      this.editData = item;
      this.myform.setValue({
        id: this.editData.id,
        apI_AccessToken: this.editData.apI_AccessToken,
        apI_ClientSecret: this.editData.apI_ClientSecret
      })
    });
  }

  addOrUpdate()
  {
    const id = this.myform.value.id || '';
    if (id != '')
    {
      this.updateShippingItem(id);
    }
    else
    {
      this.saveItem();
    }
  }

  reloadPage()
  {
    this.router.navigate([this.router.url]);
  }

  updateShippingItem(id: any)
  {
    var item = {
      id: id,
      apI_AccessToken: this.myform.value.apI_AccessToken || '',
      apI_ClientSecret: this.myform.value.apI_ClientSecret || ''

    };
    this.service.updateSiteSettings(this.siteSettingId, item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("SiteSettings updated successfully!");
        }
        else
        {
          alert("SiteSettings not updated!");
        }
        this.reloadPage();
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
      apI_AccessToken: this.myform.value.apI_AccessToken || '',
      apI_ClientSecret: this.myform.value.apI_ClientSecret || '',
    };
    this.service.createSiteSettings(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("SiteSettings created successfully!");
        }
        else
        {
          alert("SiteSettings not created!");
        }
        this.reloadPage();
      },
      (error) =>
      {
        console.error(error);
        alert(error);
      }
    );
  }
}
